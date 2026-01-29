package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	authHandler "sharpl-backend/internal/handlers/auth"
	"sharpl-backend/internal/service"
)

func ConfigureServices(api *operations.SharplAPIAPI, authService *service.AuthService) (*operations.SharplAPIAPI, error) {
	// Set up bearer token authentication
	// The BearerAuthenticator expects a function that takes (scheme string, auth function)
	// and returns a runtime.Authenticator. We use the default implementation but
	// provide our custom authentication function.
	// api.BearerAuthenticator = func(name string, authenticate func(string, []string) (interface{}, error)) runtime.Authenticator {
	// 	return runtime.AuthenticatorFunc(func(params interface{}) (bool, interface{}, error) {
	// 		// Extract token from the request
	// 		// The token is passed in through the params
	// 		if token, ok := params.(string); ok {
	// 			user, err := authService.ValidateToken(token)
	// 			if err != nil {
	// 				return false, nil, errors.New(401, "Invalid or expired token")
	// 			}
	// 			return true, user, nil
	// 		}
	// 		return false, nil, errors.New(401, "No token provided")
	// 	})
	// }

	// Register auth handlers
	authHandler.NewAuthHandler(authService).Register(api)

	// // Health endpoints
	// api.HealthGetHealthHandler = health.GetHealthHandlerFunc(func(params health.GetHealthParams) middleware.Responder {
	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"status":  "healthy",
	// 		"message": "Server is running",
	// 	})
	// })

	// api.HealthGetPingHandler = health.GetPingHandlerFunc(func(params health.GetPingParams) middleware.Responder {
	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"message": "pong",
	// 		"time":    time.Now().Format(time.RFC3339),
	// 	})
	// })

	// api.HealthPostPingHandler = health.PostPingHandlerFunc(func(params health.PostPingParams) middleware.Responder {
	// 	body := params.HTTPRequest.Body
	// 	var data map[string]interface{}
	// 	if body != nil {
	// 		json.NewDecoder(body).Decode(&data)
	// 	}
	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"message":  "pong",
	// 		"time":     time.Now().Format(time.RFC3339),
	// 		"received": data,
	// 	})
	// })

	// // Auth endpoints
	// api.AuthLoginHandler = auth.LoginHandlerFunc(func(params auth.LoginParams) middleware.Responder {
	// 	var body struct {
	// 		Email    *string `json:"email"`
	// 		Password *string `json:"password"`
	// 	}
	// 	if params.HTTPRequest.Body != nil {
	// 		json.NewDecoder(params.HTTPRequest.Body).Decode(&body)
	// 	}

	// 	if body.Email == nil || body.Password == nil {
	// 		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 			"error": "Email and password are required",
	// 		})
	// 	}

	// 	user, err := authHandler.userRepo.GetByEmail(*body.Email)
	// 	if err != nil {
	// 		return NewJSONResponse(http.StatusUnauthorized, map[string]interface{}{
	// 			"error": "Invalid credentials",
	// 		})
	// 	}

	// 	token := fmt.Sprintf("mock-jwt-token-%d-%s", user.ID, time.Now().Format("20060102150405"))

	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"token":   token,
	// 		"message": "Login successful",
	// 		"user":    user,
	// 	})
	// })

	// api.AuthRegisterHandler = auth.RegisterHandlerFunc(func(params auth.RegisterParams) middleware.Responder {
	// 	var body struct {
	// 		Email    *string `json:"email"`
	// 		Password *string `json:"password"`
	// 		Name     *string `json:"name"`
	// 	}
	// 	if params.HTTPRequest.Body != nil {
	// 		json.NewDecoder(params.HTTPRequest.Body).Decode(&body)
	// 	}

	// 	if body.Email == nil || body.Password == nil {
	// 		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 			"error": "Email and password are required",
	// 		})
	// 	}

	// 	existingUser, _ := authHandler.userRepo.GetByEmail(*body.Email)
	// 	if existingUser != nil {
	// 		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 			"error": "Email already registered",
	// 		})
	// 	}

	// 	passwordHash, _ := bcrypt.GenerateFromPassword([]byte(*body.Password), bcrypt.DefaultCost)

	// 	user := &models.User{
	// 		Email:        *body.Email,
	// 		PasswordHash: string(passwordHash),
	// 	}
	// 	if body.Name != nil {
	// 		user.Name = *body.Name
	// 	}

	// 	if err := authHandler.userRepo.Create(user); err != nil {
	// 		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 			"error": "Failed to create user",
	// 		})
	// 	}

	// 	return NewJSONResponse(http.StatusCreated, map[string]interface{}{
	// 		"message": "User registered successfully",
	// 		"email":   *body.Email,
	// 	})
	// })

	// api.AuthLogoutHandler = auth.LogoutHandlerFunc(func(params auth.LogoutParams, principal interface{}) middleware.Responder {
	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"message": "Logout successful",
	// 	})
	// })

	// // User endpoints
	// api.UsersGetUsersHandler = users.GetUsersHandlerFunc(func(params users.GetUsersParams, principal interface{}) middleware.Responder {
	// 	allUsers, err := userHandler.userRepo.GetAll()
	// 	if err != nil {
	// 		return NewJSONResponse(http.StatusInternalServerError, map[string]interface{}{
	// 			"error": "Failed to fetch users",
	// 		})
	// 	}

	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"users": allUsers,
	// 		"total": len(allUsers),
	// 	})
	// })

	// // Onboarding endpoints
	// api.OnboardingCompleteOnboardingHandler = onboarding.CompleteOnboardingHandlerFunc(func(params onboarding.CompleteOnboardingParams, principal interface{}) middleware.Responder {
	// 	var body models.OnboardingDataJSON
	// 	if params.HTTPRequest.Body != nil {
	// 		if err := json.NewDecoder(params.HTTPRequest.Body).Decode(&body); err != nil {
	// 			return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 				"error": "Invalid request body",
	// 			})
	// 		}
	// 	}

	// 	userID := uint(1)

	// 	onboardingData := &models.Onboarding{
	// 		UserID: userID,
	// 		Data:   body,
	// 	}

	// 	if err := onboardingHandler.onboardingRepo.Upsert(onboardingData); err != nil {
	// 		return NewJSONResponse(http.StatusBadRequest, map[string]interface{}{
	// 			"error": "Failed to save onboarding data",
	// 		})
	// 	}

	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"message": "Onboarding data saved successfully",
	// 		"data":    body,
	// 	})
	// })

	// api.OnboardingGetOnboardingHandler = onboarding.GetOnboardingHandlerFunc(func(params onboarding.GetOnboardingParams, principal interface{}) middleware.Responder {
	// 	userID := uint(1)

	// 	data, err := onboardingHandler.onboardingRepo.GetByUserID(userID)
	// 	if err != nil {
	// 		return NewJSONResponse(http.StatusNotFound, map[string]interface{}{
	// 			"error": "Onboarding data not found",
	// 		})
	// 	}

	// 	return NewJSONResponse(http.StatusOK, map[string]interface{}{
	// 		"message": "Onboarding data retrieved successfully",
	// 		"data":    data.Data,
	// 	})
	// })
	return api, nil
}
