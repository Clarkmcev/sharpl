package service

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

func SetAuthService(userRepo repositories.UserRepository) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

type AuthService struct {
	userRepo repositories.UserRepository
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

	return token, user, nil
}

func (s *AuthService) generateToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes) + "-" + time.Now().Format("20060102150405"), nil
}
