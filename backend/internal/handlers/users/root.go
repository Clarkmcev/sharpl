package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/generated/restapi/operations/users"
	"sharpl-backend/internal/repositories"
)

type UserHandler struct {
	userRepo repositories.UserRepository
}

func NewUserHandler(userRepo repositories.UserRepository) *UserHandler {
	return &UserHandler{
		userRepo: userRepo,
	}
}

// RegisterHandlers registers user handlers
func (h *UserHandler) RegisterHandlers(api *operations.SharplAPIAPI) {
	api.UsersGetUsersHandler = users.GetUsersHandlerFunc(h.GetUsers)
}
