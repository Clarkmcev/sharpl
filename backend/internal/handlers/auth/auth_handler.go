package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/auth"
	middlewareInternal "sharpl-backend/internal/middleware"

	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

func (h AuthHandler) Login(params auth.LoginParams) middleware.Responder {
	fmt.Println("Login called")
	var req generatedModels.LoginRequest
	if params.HTTPRequest.Body != nil {
		if err := json.NewDecoder(params.HTTPRequest.Body).Decode(&req); err != nil {
			return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
				Error: "Invalid request body",
			})
		}
	}

	if req.Email == nil || req.Password == nil || req.Email.String() == "" || req.Password.String() == "" {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password are required",
		})
	}

	token, dbUser, err := h.authService.Login(req.Email.String(), req.Password.String())
	if err != nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	// Convert internal user model to generated API user model
	userID := int64(dbUser.ID)
	email := strfmt.Email(dbUser.Email)
	message := "Login successful"
	
	apiUser := &generatedModels.User{
		ID:        &userID,
		Email:     &email,
		Name:      dbUser.Name,
		CreatedAt: strfmt.DateTime(dbUser.CreatedAt),
		UpdatedAt: strfmt.DateTime(dbUser.UpdatedAt),
	}

	response := generatedModels.LoginResponse{
		Token:   &token,
		Message: &message,
		User:    apiUser,
	}

	return NewJSONResponse(http.StatusOK, response)
}

func (h AuthHandler) RegisterUser(params auth.RegisterParams) middleware.Responder {
	fmt.Println("Register called")
	var req generatedModels.RegisterRequest
	if params.HTTPRequest.Body != nil {
		if err := json.NewDecoder(params.HTTPRequest.Body).Decode(&req); err != nil {
			return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
				Error: "Invalid request body",
			})
		}
	}

	if req.Email == nil || req.Password == nil || req.Email.String() == "" || req.Password.String() == "" {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password are required",
		})
	}

	name := req.Name

	dbUser, err := h.authService.Register(req.Email.String(), req.Password.String(), name)
	if err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	email := strfmt.Email(dbUser.Email)
	message := "User registered successfully"
	
	response := generatedModels.RegisterResponse{
		Email:   email,
		Message: message,
	}

	return NewJSONResponse(http.StatusCreated, response)
}

func (h AuthHandler) Logout(params auth.LogoutParams) middleware.Responder {
	fmt.Println("Logout called")
	token, err := middlewareInternal.ExtractTokenFromRequest(params.HTTPRequest, h.authService)
	if err != nil {
		// If token is invalid/expired, user is already logged out
		message := "Logout successful"
		return NewJSONResponse(http.StatusOK, generatedModels.MessageResponse{
			Message: message,
		})
	}

	// Delete the session
	if err := h.authService.Logout(token); err != nil {
		return NewJSONResponse(http.StatusInternalServerError, generatedModels.ErrorResponse{
			Error: "Failed to logout",
		})
	}

	message := "Logout successful"
	return NewJSONResponse(http.StatusOK, generatedModels.MessageResponse{
		Message: message,
	})
}
