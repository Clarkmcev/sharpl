package handlers

import (
	"fmt"
	"net/http"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	userRepo repositories.UserRepository
}

func NewAuthHandler(userRepo repositories.UserRepository) *AuthHandler {
	return &AuthHandler{
		userRepo: userRepo,
	}
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginResponse struct {
	Token   string      `json:"token"`
	Message string      `json:"message"`
	User    interface{} `json:"user"`
}

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name"`
}

type RegisterResponse struct {
	Message string `json:"message"`
	Email   string `json:"email"`
}

// Login handles user authentication
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by email
	user, err := h.userRepo.GetByEmail(req.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// TODO: Implement proper password verification with bcrypt
	// For now, we'll use mock authentication

	// Mock token generation - replace with JWT in production
	token := fmt.Sprintf("mock-jwt-token-%d-%s", user.ID, time.Now().Format("20060102150405"))

	c.JSON(http.StatusOK, LoginResponse{
		Token:   token,
		Message: "Login successful",
		User:    user,
	})
}

// Register handles user registration
func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if user already exists
	existingUser, _ := h.userRepo.GetByEmail(req.Email)
	if existingUser != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	// TODO: Hash password with bcrypt
	// For now, store plain password (NOT for production!)
	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

	// Create user
	user := &models.User{
		Email:        req.Email,
		PasswordHash: string(passwordHash),
		Name:         req.Name,
	}

	if err := h.userRepo.Create(user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, RegisterResponse{
		Message: "User registered successfully",
		Email:   req.Email,
	})
}

// Logout handles user logout
func (h *AuthHandler) Logout(c *gin.Context) {
	// TODO: Invalidate token in database/cache
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}
