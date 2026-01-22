package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"sharpl-backend/generated/restapi/operations/auth"

	"github.com/go-openapi/runtime/middleware"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (h AuthHandler) Login(params auth.LoginParams) middleware.Responder {
	fmt.Println("Login called")

	var req LoginRequest
	if params.HTTPRequest.Body != nil {
		if err := json.NewDecoder(params.HTTPRequest.Body).Decode(&req); err != nil {
			return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
				"error": "Invalid request body",
			})
		}
	}

	if req.Email == "" || req.Password == "" {
		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
			"error": "Email and password are required",
		})
	}

	token, user, err := h.authService.Login(req.Email, req.Password)
	if err != nil {
		return NewJSONResponse(http.StatusUnauthorized, map[string]interface{}{
			"error": err.Error(),
		})
	}

	return NewJSONResponse(http.StatusOK, map[string]interface{}{
		"token":   token,
		"message": "Login successful",
		"user":    user,
	})
}
func (h AuthHandler) Logout(params auth.LogoutParams) middleware.Responder {
	fmt.Println("Logout called")

	// Implement logout logic if needed (e.g., invalidate token)

	return NewJSONResponse(http.StatusOK, map[string]interface{}{
		"message": "Logout successful",
	})
}
