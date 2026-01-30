package middleware

import (
	"context"
	"net/http"

	"sharpl-backend/internal/models"
	"sharpl-backend/internal/service"
)

type contextKey string

const UserContextKey contextKey = "user"

// CommonAuth middleware extracts and validates the bearer token from Authorization header
func CommonAuth(authService *service.AuthService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")

			token, err := authService.ExtractTokenFromHeader(authHeader)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{"error": "` + err.Error() + `"}`))
				return
			}

			user, err := authService.ValidateToken(token)
			if err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{"error": "` + err.Error() + `"}`))
				return
			}

			// Add user to context
			ctx := context.WithValue(r.Context(), UserContextKey, user)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// GetUserFromContext retrieves the authenticated user from the request context
func GetUserFromContext(ctx context.Context) (*models.User, bool) {
	user, ok := ctx.Value(UserContextKey).(*models.User)
	return user, ok
}

// ExtractTokenFromRequest extracts token from request Authorization header
func ExtractTokenFromRequest(r *http.Request, authService *service.AuthService) (string, error) {
	authHeader := r.Header.Get("Authorization")
	return authService.ExtractTokenFromHeader(authHeader)
}
