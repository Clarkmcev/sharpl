package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sharpl-backend/generated/restapi/operations/auth"
	middlewareInternal "sharpl-backend/internal/middleware"

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
	token, err := middlewareInternal.ExtractTokenFromRequest(params.HTTPRequest, h.authService)
	if err != nil {
		// If token is invalid/expired, user is already logged out
		return NewJSONResponse(http.StatusOK, map[string]interface{}{
			"message": "Logout successful",
		})
	}

	// Delete the session
	if err := h.authService.Logout(token); err != nil {
		return NewJSONResponse(http.StatusInternalServerError, map[string]interface{}{
			"error": "Failed to logout",
		})
	}

	return NewJSONResponse(http.StatusOK, map[string]interface{}{
		"message": "Logout successful",
	})
}
