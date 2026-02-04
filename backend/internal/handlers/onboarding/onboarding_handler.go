package handlers

import (
	"fmt"
	"net/http"

	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/onboarding"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/service"

	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

func (h *OnboardingHandler) CompleteOnboarding(params onboarding.CompleteOnboardingParams, principal interface{}) middleware.Responder {
	fmt.Println("CompleteOnboarding called")

	// params.Body is already parsed by go-swagger
	if params.Body == nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: "Request body is required",
		})
	}

	// Get user from principal (already validated by JWT middleware)
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	// Convert generated model to internal model
	internalData := convertGeneratedToInternalOnboardingData(params.Body)

	// Save onboarding data
	savedOnboarding, err := h.onboardingService.SaveOnboarding(user.ID, internalData)
	if err != nil {
		return NewJSONResponse(http.StatusBadRequest, generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	// Convert back to generated model for response
	responseData := convertInternalToGeneratedOnboardingData(savedOnboarding.Data)
	message := "Onboarding data saved successfully"

	response := generatedModels.OnboardingResponse{
		Message: &message,
		Data:    responseData,
	}

	return NewJSONResponse(http.StatusOK, response)
}

func (h *OnboardingHandler) GetOnboarding(params onboarding.GetOnboardingParams, principal interface{}) middleware.Responder {
	fmt.Println("GetOnboarding called")

	// Get user from principal (already validated by JWT middleware)
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return NewJSONResponse(http.StatusUnauthorized, generatedModels.ErrorResponse{
			Error: "Unauthorized",
		})
	}

	// Get onboarding data
	savedOnboarding, err := h.onboardingService.GetOnboarding(user.ID)
	if err != nil {
		return NewJSONResponse(http.StatusNotFound, generatedModels.ErrorResponse{
			Error: "Onboarding data not found",
		})
	}

	// Convert to generated model for response
	responseData := convertInternalToGeneratedOnboardingData(savedOnboarding.Data)
	message := "Onboarding data retrieved successfully"

	response := generatedModels.OnboardingResponse{
		Message: &message,
		Data:    responseData,
	}

	return NewJSONResponse(http.StatusOK, response)
}

// Helper function to extract token from request
func extractTokenFromRequest(r *http.Request, authService *service.AuthService) (string, error) {
	authHeader := r.Header.Get("Authorization")
	return authService.ExtractTokenFromHeader(authHeader)
}

// Convert generated OnboardingData to internal OnboardingDataJSON
func convertGeneratedToInternalOnboardingData(generated *generatedModels.OnboardingData) models.OnboardingDataJSON {
	races := make([]models.Race, len(generated.Races))
	for i, r := range generated.Races {
		races[i] = models.Race{
			Name:       *r.Name,
			Discipline: *r.Discipline,
			Distance:   *r.Distance,
			Date:       r.Date.String(),
			Goal:       *r.Goal,
		}
	}

	return models.OnboardingDataJSON{
		Sport:                *generated.Sport,
		ExperienceLevel:      *generated.ExperienceLevel,
		WeeklyTrainingHours:  *generated.WeeklyTrainingHours,
		PreparingForRace:     *generated.PreparingForRace,
		Races:                races,
		CurrentVolume:        *generated.CurrentVolume,
		LongestRun:           *generated.LongestRun,
		RecentRaces:          *generated.RecentRaces,
		Injuries:             *generated.Injuries,
		TrainingDays:         *generated.TrainingDays,
		PreferredWorkoutTime: *generated.PreferredWorkoutTime,
		GymAccess:            *generated.GymAccess,
		CrossTraining:        generated.CrossTraining,
	}
}

// Convert internal OnboardingDataJSON to generated OnboardingData
func convertInternalToGeneratedOnboardingData(internal models.OnboardingDataJSON) *generatedModels.OnboardingData {
	races := make([]*generatedModels.Race, len(internal.Races))
	for i, r := range internal.Races {
		name := r.Name
		discipline := r.Discipline
		distance := r.Distance
		goal := r.Goal
		
		// Parse date string to strfmt.Date
		dateValue := strfmt.Date{}
		dateValue.UnmarshalText([]byte(r.Date))

		races[i] = &generatedModels.Race{
			Name:       &name,
			Discipline: &discipline,
			Distance:   &distance,
			Date:       &dateValue,
			Goal:       &goal,
		}
	}

	sport := internal.Sport
	experienceLevel := internal.ExperienceLevel
	weeklyTrainingHours := internal.WeeklyTrainingHours
	preparingForRace := internal.PreparingForRace
	currentVolume := internal.CurrentVolume
	longestRun := internal.LongestRun
	recentRaces := internal.RecentRaces
	injuries := internal.Injuries
	trainingDays := internal.TrainingDays
	preferredWorkoutTime := internal.PreferredWorkoutTime
	gymAccess := internal.GymAccess

	return &generatedModels.OnboardingData{
		Sport:                &sport,
		ExperienceLevel:      &experienceLevel,
		WeeklyTrainingHours:  &weeklyTrainingHours,
		PreparingForRace:     &preparingForRace,
		Races:                races,
		CurrentVolume:        &currentVolume,
		LongestRun:           &longestRun,
		RecentRaces:          &recentRaces,
		Injuries:             &injuries,
		TrainingDays:         &trainingDays,
		PreferredWorkoutTime: &preferredWorkoutTime,
		GymAccess:            &gymAccess,
		CrossTraining:        internal.CrossTraining,
	}
}
