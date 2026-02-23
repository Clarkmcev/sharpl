package handlers

import (
	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/race_plans"
	"sharpl-backend/internal/models"
	"time"

	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
)

func (h *RacePlanHandler) GetRacePlans(params race_plans.GetRacePlansParams) middleware.Responder {
	plans, err := h.racePlanService.GetAllPlans()
	if err != nil {
		return race_plans.NewGetRacePlansInternalServerError().WithPayload(&generatedModels.ErrorResponse{
			Error: "Failed to retrieve race plans",
		})
	}

	// Convert internal models to generated models
	var planData []*generatedModels.RacePlan
	for _, plan := range plans {
		weeks := make([]*generatedModels.RacePlanWeeklyStructureWeeksItems0, 0)
		for _, week := range plan.WeeklyStructure.Weeks {
			weeks = append(weeks, &generatedModels.RacePlanWeeklyStructureWeeksItems0{
				Week:        int64(week.Week),
				Description: week.Description,
			})
		}

		planData = append(planData, &generatedModels.RacePlan{
			ID:              int64(plan.ID),
			Name:            plan.Name,
			RaceType:        plan.RaceType,
			Distance:        plan.Distance,
			Discipline:      plan.Discipline,
			DurationWeeks:   int64(plan.DurationWeeks),
			ExperienceLevel: plan.ExperienceLevel,
			Description:     plan.Description,
			WeeklyStructure: &generatedModels.RacePlanWeeklyStructure{
				Weeks: weeks,
			},
		})
	}

	message := "Race plans retrieved successfully"
	return race_plans.NewGetRacePlansOK().WithPayload(&generatedModels.RacePlansResponse{
		Message: &message,
		Data:    planData,
	})
}

func (h *RacePlanHandler) GetRacePlan(params race_plans.GetRacePlanParams) middleware.Responder {
	plan, err := h.racePlanService.GetPlanByID(uint(params.PlanID))
	if err != nil {
		return race_plans.NewGetRacePlanNotFound().WithPayload(&generatedModels.ErrorResponse{
			Error: "Race plan not found",
		})
	}

	// Convert internal model to generated model
	weeks := make([]*generatedModels.RacePlanWeeklyStructureWeeksItems0, 0)
	for _, week := range plan.WeeklyStructure.Weeks {
		weeks = append(weeks, &generatedModels.RacePlanWeeklyStructureWeeksItems0{
			Week:        int64(week.Week),
			Description: week.Description,
		})
	}

	planData := &generatedModels.RacePlan{
		ID:              int64(plan.ID),
		Name:            plan.Name,
		RaceType:        plan.RaceType,
		Distance:        plan.Distance,
		Discipline:      plan.Discipline,
		DurationWeeks:   int64(plan.DurationWeeks),
		ExperienceLevel: plan.ExperienceLevel,
		Description:     plan.Description,
		WeeklyStructure: &generatedModels.RacePlanWeeklyStructure{
			Weeks: weeks,
		},
	}

	message := "Race plan retrieved successfully"
	return race_plans.NewGetRacePlanOK().WithPayload(&generatedModels.RacePlanResponse{
		Message: &message,
		Data:    planData,
	})
}

func (h *RacePlanHandler) FilterRacePlans(params race_plans.FilterRacePlansParams) middleware.Responder {
	raceType := ""
	if params.RaceType != nil {
		raceType = *params.RaceType
	}

	distance := ""
	if params.Distance != nil {
		distance = *params.Distance
	}

	experienceLevel := ""
	if params.ExperienceLevel != nil {
		experienceLevel = *params.ExperienceLevel
	}

	plans, err := h.racePlanService.GetPlansByFilters(raceType, distance, experienceLevel)
	if err != nil {
		return race_plans.NewFilterRacePlansInternalServerError().WithPayload(&generatedModels.ErrorResponse{
			Error: "Failed to retrieve race plans",
		})
	}

	// Convert internal models to generated models
	var planData []*generatedModels.RacePlan
	for _, plan := range plans {
		weeks := make([]*generatedModels.RacePlanWeeklyStructureWeeksItems0, 0)
		for _, week := range plan.WeeklyStructure.Weeks {
			weeks = append(weeks, &generatedModels.RacePlanWeeklyStructureWeeksItems0{
				Week:        int64(week.Week),
				Description: week.Description,
			})
		}

		planData = append(planData, &generatedModels.RacePlan{
			ID:              int64(plan.ID),
			Name:            plan.Name,
			RaceType:        plan.RaceType,
			Distance:        plan.Distance,
			Discipline:      plan.Discipline,
			DurationWeeks:   int64(plan.DurationWeeks),
			ExperienceLevel: plan.ExperienceLevel,
			Description:     plan.Description,
			WeeklyStructure: &generatedModels.RacePlanWeeklyStructure{
				Weeks: weeks,
			},
		})
	}

	message := "Race plans retrieved successfully"
	return race_plans.NewFilterRacePlansOK().WithPayload(&generatedModels.RacePlansResponse{
		Message: &message,
		Data:    planData,
	})
}

func (h *RacePlanHandler) EnrollInRacePlan(params race_plans.EnrollInRacePlanParams, principal interface{}) middleware.Responder {
	// Get user from principal (already validated by JWT middleware)
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return race_plans.NewEnrollInRacePlanBadRequest().WithPayload(&generatedModels.ErrorResponse{
			Error: "Invalid user authentication",
		})
	}

	// Parse dates
	var startDate, targetRaceDate *time.Time
	if params.Body.StartDate != nil {
		t := time.Time(*params.Body.StartDate)
		startDate = &t
	}
	if params.Body.TargetRaceDate.String() != "" {
		t := time.Time(params.Body.TargetRaceDate)
		targetRaceDate = &t
	}

	// Enroll user
	enrollment, err := h.racePlanService.EnrollUser(user.ID, uint(params.PlanID), startDate, targetRaceDate)
	if err != nil {
		if err.Error() == "race plan not found" {
			return race_plans.NewEnrollInRacePlanNotFound().WithPayload(&generatedModels.ErrorResponse{
				Error: err.Error(),
			})
		}
		return race_plans.NewEnrollInRacePlanBadRequest().WithPayload(&generatedModels.ErrorResponse{
			Error: err.Error(),
		})
	}

	message := "Successfully enrolled in training plan"
	
	var startDateResponse, targetRaceDateResponse strfmt.Date
	var enrolledAtResponse strfmt.DateTime
	
	if enrollment.StartDate != nil {
		startDateResponse = strfmt.Date(*enrollment.StartDate)
	}
	if enrollment.TargetRaceDate != nil {
		targetRaceDateResponse = strfmt.Date(*enrollment.TargetRaceDate)
	}
	enrolledAtResponse = strfmt.DateTime(enrollment.EnrolledAt)
	
	return race_plans.NewEnrollInRacePlanOK().WithPayload(&generatedModels.EnrollmentResponse{
		Message: &message,
		Data: &generatedModels.EnrollmentResponseData{
			EnrollmentID:   int64(enrollment.ID),
			UserID:         int64(enrollment.UserID),
			RacePlanID:     int64(enrollment.RacePlanID),
			StartDate:      startDateResponse,
			TargetRaceDate: targetRaceDateResponse,
			Status:         enrollment.Status,
			EnrolledAt:     enrolledAtResponse,
		},
	})
}

func (h *RacePlanHandler) GetMyEnrollments(params race_plans.GetMyEnrollmentsParams, principal interface{}) middleware.Responder {
// Get user from principal (already validated by JWT middleware)
user, ok := principal.(*models.User)
if !ok || user == nil {
return race_plans.NewGetMyEnrollmentsUnauthorized().WithPayload(&generatedModels.ErrorResponse{
Error: "Invalid user authentication",
})
}

// Get user's enrollments
enrollments, err := h.racePlanService.GetUserEnrollments(user.ID)
if err != nil {
return race_plans.NewGetMyEnrollmentsInternalServerError().WithPayload(&generatedModels.ErrorResponse{
Error: "Failed to retrieve enrollments",
})
}

// Convert to response format
var enrollmentData []*generatedModels.MyEnrollmentsResponseDataItems0
for _, enrollment := range enrollments {
// Convert weekly structure
weeks := make([]*generatedModels.RacePlanWeeklyStructureWeeksItems0, 0)
for _, week := range enrollment.RacePlan.WeeklyStructure.Weeks {
weeks = append(weeks, &generatedModels.RacePlanWeeklyStructureWeeksItems0{
Week:        int64(week.Week),
Description: week.Description,
})
}

racePlanData := &generatedModels.RacePlan{
ID:              int64(enrollment.RacePlan.ID),
Name:            enrollment.RacePlan.Name,
RaceType:        enrollment.RacePlan.RaceType,
Distance:        enrollment.RacePlan.Distance,
Discipline:      enrollment.RacePlan.Discipline,
DurationWeeks:   int64(enrollment.RacePlan.DurationWeeks),
ExperienceLevel: enrollment.RacePlan.ExperienceLevel,
Description:     enrollment.RacePlan.Description,
WeeklyStructure: &generatedModels.RacePlanWeeklyStructure{
Weeks: weeks,
},
}

var startDateResponse, targetRaceDateResponse strfmt.Date
var enrolledAtResponse strfmt.DateTime

if enrollment.StartDate != nil {
startDateResponse = strfmt.Date(*enrollment.StartDate)
}
if enrollment.TargetRaceDate != nil {
targetRaceDateResponse = strfmt.Date(*enrollment.TargetRaceDate)
}
enrolledAtResponse = strfmt.DateTime(enrollment.EnrolledAt)

enrollmentData = append(enrollmentData, &generatedModels.MyEnrollmentsResponseDataItems0{
EnrollmentID:   int64(enrollment.ID),
UserID:         int64(enrollment.UserID),
RacePlan:       racePlanData,
StartDate:      startDateResponse,
TargetRaceDate: targetRaceDateResponse,
Status:         enrollment.Status,
EnrolledAt:     enrolledAtResponse,
})
}

message := "Enrollments retrieved successfully"
return race_plans.NewGetMyEnrollmentsOK().WithPayload(&generatedModels.MyEnrollmentsResponse{
Message: &message,
Data:    enrollmentData,
})
}

func (h *RacePlanHandler) UnenrollFromRacePlan(params race_plans.UnenrollFromRacePlanParams, principal interface{}) middleware.Responder {
	// Get user from principal (already validated by JWT middleware)
	user, ok := principal.(*models.User)
	if !ok || user == nil {
		return race_plans.NewUnenrollFromRacePlanBadRequest().WithPayload(&generatedModels.ErrorResponse{
			Error: "Invalid user authentication",
		})
	}

	// Unenroll user
	err := h.racePlanService.UnenrollUser(user.ID, uint(params.PlanID))
	if err != nil {
		if err.Error() == "enrollment not found" {
			return race_plans.NewUnenrollFromRacePlanNotFound().WithPayload(&generatedModels.ErrorResponse{
				Error: err.Error(),
			})
		}
		return race_plans.NewUnenrollFromRacePlanInternalServerError().WithPayload(&generatedModels.ErrorResponse{
			Error: "Failed to unenroll from training plan",
		})
	}

	message := "Successfully unenrolled from training plan"
	return race_plans.NewUnenrollFromRacePlanOK().WithPayload(&generatedModels.MessageResponse{
		Message: &message,
	})
}
