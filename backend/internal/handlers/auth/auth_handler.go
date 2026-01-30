package handlers

import (
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

	if params.Body == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Request body is required",
		})
	}

	if params.Body.Email == nil || params.Body.Password == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password are required",
		})
	}

	email := params.Body.Email.String()
	password := params.Body.Password.String()

	if email == "" || password == "" {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password cannot be empty",
		})
	}

	token, dbUser, err := h.authService.Login(email, password)
	if err != nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	// Convert internal user model to generated API user model
	userID := int64(dbUser.ID)
	emailStrfmt := strfmt.Email(dbUser.Email)
	message := "Login successful"

	apiUser := &generatedModels.User{
		ID:        &userID,
		Email:     &emailStrfmt,
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

	// params.Body is already parsed by go-swagger - use it directly!
	if params.Body == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Request body is required",
		})
	}

	if params.Body.Email == nil || params.Body.Password == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password are required",
		})
	}

	email := params.Body.Email.String()
	password := params.Body.Password.String()
	name := params.Body.Name

	if email == "" || password == "" {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Email and password cannot be empty",
		})
	}

	dbUser, err := h.authService.Register(email, password, name)
	if err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	emailStrfmt := strfmt.Email(dbUser.Email)
	message := "User registered successfully"

	response := generatedModels.RegisterResponse{
		Email:   emailStrfmt,
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
