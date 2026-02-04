package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	authHandler "sharpl-backend/internal/handlers/auth"
	onboardingHandler "sharpl-backend/internal/handlers/onboarding"
	usersHandler "sharpl-backend/internal/handlers/users"
	"sharpl-backend/internal/repositories"
	"sharpl-backend/internal/service"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/security"
)

func ConfigureServices(api *operations.SharplAPIAPI, authService *service.AuthService, onboardingService *service.OnboardingService, userRepo repositories.UserRepository) (*operations.SharplAPIAPI, error) {
	// Set up JWT authentication
	api.JWTAuth = func(tokenString string) (interface{}, error) {
		// go-swagger passes just the token value (not the full header)
		// If it starts with "Bearer ", extract the token part
		token := tokenString
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			token = tokenString[7:]
		}

		user, err := authService.ValidateToken(token)
		if err != nil {
			return nil, errors.New(401, "Invalid or expired token")
		}
		return user, nil
	}

	// Set up bearer token authentication
	api.BearerAuthenticator = func(name string, authenticate security.ScopedTokenAuthentication) runtime.Authenticator {
		// Use the default security.BearerAuth implementation with our custom authentication logic
		return security.BearerAuth(name, func(token string, scopes []string) (interface{}, error) {
			user, err := authService.ValidateToken(token)
			if err != nil {
				return nil, errors.New(401, "Invalid or expired token")
			}
			return user, nil
		})
	}

	// Register auth handlers
	authHandler.NewAuthHandler(authService).RegisterHandlers(api)

	// Register onboarding handlers
	onboardingHandler.NewOnboardingHandler(onboardingService, authService).RegisterHandlers(api)

	// Register user handlers
	usersHandler.NewUserHandler(userRepo).RegisterHandlers(api)

	return api, nil
}
