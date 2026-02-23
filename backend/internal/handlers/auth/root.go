package handlers

import (
	"encoding/json"
	"net/http"

	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/generated/restapi/operations/auth"
	"sharpl-backend/internal/service"

	"github.com/go-openapi/runtime"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

// JSONResponse is a custom responder for JSON responses
type JSONResponse struct {
	code    int
	payload interface{}
}

func NewJSONResponse(code int, payload interface{}) *JSONResponse {
	return &JSONResponse{code: code, payload: payload}
}

func (o *JSONResponse) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(o.code)
	if o.payload != nil {
		json.NewEncoder(rw).Encode(o.payload)
	}
}

// RegisterHandlers registers auth handlers
func (h AuthHandler) RegisterHandlers(api *operations.SharplAPIAPI) {
	api.AuthLoginHandler = auth.LoginHandlerFunc(h.Login)
	api.AuthRegisterHandler = auth.RegisterHandlerFunc(h.RegisterUser)
	api.AuthLogoutHandler = auth.LogoutHandlerFunc(h.Logout)
	api.AuthWhoamiHandler = auth.WhoamiHandlerFunc(h.Whoami)
}
