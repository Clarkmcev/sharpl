package handlers

import (
	"fmt"
	"net/http"

	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/users"

	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

func (h *UserHandler) GetUsers(params users.GetUsersParams) middleware.Responder {
	fmt.Println("GetUsers called")

	// Get all users from repository
	dbUsers, err := h.userRepo.GetAll()
	if err != nil {
		return NewJSONResponse(http.StatusInternalServerError, generatedModels.ErrorResponse{
			Error: "Failed to retrieve users",
		})
	}

	// Convert to API models
	apiUsers := make([]*generatedModels.User, len(dbUsers))
	for i, dbUser := range dbUsers {
		userID := int64(dbUser.ID)
		email := strfmt.Email(dbUser.Email)
		
		apiUsers[i] = &generatedModels.User{
			ID:        &userID,
			Email:     &email,
			Name:      dbUser.Name,
			CreatedAt: strfmt.DateTime(dbUser.CreatedAt),
			UpdatedAt: strfmt.DateTime(dbUser.UpdatedAt),
		}
	}

	total := int64(len(apiUsers))
	response := generatedModels.UsersResponse{
		Users: apiUsers,
		Total: total,
	}

	return NewJSONResponse(http.StatusOK, response)
}
