package handlers

import (
	"fmt"
	"sharpl-backend/generated/restapi/operations"
	authHandler "sharpl-backend/internal/handlers/auth"
	"sharpl-backend/internal/service"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/security"
)

func ConfigureServices(api *operations.SharplAPIAPI, authService *service.AuthService) (*operations.SharplAPIAPI, error) {
	// Set up bearer token authentication
	// BearerAuthenticator is a function that takes (name, authenticate) and returns an Authenticator
	api.BearerAuthenticator = func(name string, authenticate security.ScopedTokenAuthentication) runtime.Authenticator {
		fmt.Println("Test, test, test")
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

	return api, nil
}
