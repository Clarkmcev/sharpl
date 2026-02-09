package handlers

import (
	"net/http"
	"time"

	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/races"
	"sharpl-backend/internal/models"

	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

func (h *RaceHandler) CreateRace(params races.CreateRaceParams, principal interface{}) middleware.Responder {
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	if params.Body == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Request body is required",
		})
	}

	date, err := time.Parse("2006-01-02", params.Body.Date.String())
	if err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Invalid date format",
		})
	}

	race := &models.Race{
		UserID:     user.ID,
		Name:       *params.Body.Name,
		Discipline: *params.Body.Discipline,
		Distance:   *params.Body.Distance,
		Date:       date,
		Goal:       *params.Body.Goal,
	}

	if err := h.raceService.CreateRace(race); err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	message := "Race created successfully"
	responseData := convertInternalRaceToGenerated(race)

	return NewJSONResponse(http.StatusCreated, generatedModels.RaceResponse{
		Message: &message,
		Data:    responseData,
	})
}

func (h *RaceHandler) GetRaces(params races.GetRacesParams, principal interface{}) middleware.Responder {
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	userRaces, err := h.raceService.GetUserRaces(user.ID)
	if err != nil {
		return NewJSONResponse(http.StatusInternalServerError, generatedModels.ErrorResponse{
			Error: "Failed to retrieve races",
		})
	}

	message := "Races retrieved successfully"
	responseData := make([]*generatedModels.RaceData, len(userRaces))
	for i, race := range userRaces {
		responseData[i] = convertInternalRaceToGenerated(&race)
	}

	return NewJSONResponse(http.StatusOK, generatedModels.RacesResponse{
		Message: &message,
		Data:    responseData,
	})
}

func (h *RaceHandler) GetRace(params races.GetRaceParams, principal interface{}) middleware.Responder {
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	race, err := h.raceService.GetRaceByID(uint(params.RaceID), user.ID)
	if err != nil {
		return NewJSONResponse(http.StatusNotFound, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	message := "Race retrieved successfully"
	responseData := convertInternalRaceToGenerated(race)

	return NewJSONResponse(http.StatusOK, generatedModels.RaceResponse{
		Message: &message,
		Data:    responseData,
	})
}

func (h *RaceHandler) UpdateRace(params races.UpdateRaceParams, principal interface{}) middleware.Responder {
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	if params.Body == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Request body is required",
		})
	}

	date, err := time.Parse("2006-01-02", params.Body.Date.String())
	if err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Invalid date format",
		})
	}

	race := &models.Race{
		ID:         uint(params.RaceID),
		UserID:     user.ID,
		Name:       *params.Body.Name,
		Discipline: *params.Body.Discipline,
		Distance:   *params.Body.Distance,
		Date:       date,
		Goal:       *params.Body.Goal,
	}

	if err := h.raceService.UpdateRace(race); err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	message := "Race updated successfully"
	responseData := convertInternalRaceToGenerated(race)

	return NewJSONResponse(http.StatusOK, generatedModels.RaceResponse{
		Message: &message,
		Data:    responseData,
	})
}

func (h *RaceHandler) DeleteRace(params races.DeleteRaceParams, principal interface{}) middleware.Responder {
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	if err := h.raceService.DeleteRace(uint(params.RaceID), user.ID); err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	message := "Race deleted successfully"
	return NewJSONResponse(http.StatusOK, generatedModels.MessageResponse{
		Message: &message,
	})
}

func convertInternalRaceToGenerated(race *models.Race) *generatedModels.RaceData {
	id := int64(race.ID)
	userID := int64(race.UserID)
	name := race.Name
	discipline := race.Discipline
	distance := race.Distance
	goal := race.Goal

	dateTime := strfmt.DateTime(race.Date)
	createdAt := strfmt.DateTime(race.CreatedAt)
	updatedAt := strfmt.DateTime(race.UpdatedAt)

	return &generatedModels.RaceData{
		ID:         &id,
		UserID:     &userID,
		Name:       &name,
		Discipline: &discipline,
		Distance:   &distance,
		Date:       &dateTime,
		Goal:       &goal,
		CreatedAt:  createdAt,
		UpdatedAt:  updatedAt,
	}
}
