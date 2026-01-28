package service

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"strings"
	"time"

	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

func SetAuthService(userRepo repositories.UserRepository, sessionRepo repositories.SessionRepository) *AuthService {
	return &AuthService{
		userRepo:    userRepo,
		sessionRepo: sessionRepo,
	}
}

type AuthService struct {
	userRepo    repositories.UserRepository
	sessionRepo repositories.SessionRepository
}

func (s *AuthService) Login(email, password string) (string, *models.User, error) {
	user, err := s.userRepo.GetByEmail(email)
	if err != nil {
		return "", nil, errors.New("Invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", nil, errors.New("Invalid credentials")
	}

	token, err := s.generateToken()
	if err != nil {
		return "", nil, errors.New("Failed to generate token")
	}

	// Create session
	session := &models.Session{
		UserID:    user.ID,
		Token:     token,
		ExpiresAt: time.Now().Add(24 * time.Hour), // Token expires in 24 hours
	}

	if err := s.sessionRepo.Create(session); err != nil {
		return "", nil, errors.New("Failed to create session")
	}

	return token, user, nil
}

func (s *AuthService) Logout(token string) error {
	return s.sessionRepo.DeleteByToken(token)
}

func (s *AuthService) ValidateToken(token string) (*models.User, error) {
	session, err := s.sessionRepo.GetByToken(token)
	if err != nil {
		return nil, errors.New("Invalid or expired token")
	}

	user, err := s.userRepo.GetByID(session.UserID)
	if err != nil {
		return nil, errors.New("User not found")
	}

	return user, nil
}

// ExtractTokenFromHeader extracts the bearer token from Authorization header
func (s *AuthService) ExtractTokenFromHeader(authHeader string) (string, error) {
	if authHeader == "" {
		return "", errors.New("Authorization header is missing")
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
		return "", errors.New("Invalid Authorization header format. Expected 'Bearer <token>'")
	}

	return parts[1], nil
}

func (s *AuthService) generateToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes) + "-" + time.Now().Format("20060102150405"), nil
}
