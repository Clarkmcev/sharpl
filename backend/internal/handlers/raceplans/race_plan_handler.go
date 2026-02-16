package handlers

import (
	generatedModels "sharpl-backend/generated/models"
	"sharpl-backend/generated/restapi/operations/race_plans"

	"github.com/go-openapi/runtime/middleware"
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
