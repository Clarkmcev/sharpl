package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/generated/restapi/operations/race_plans"
	"sharpl-backend/internal/service"
)

type RacePlanHandler struct {
	racePlanService *service.RacePlanService
}

func NewRacePlanHandler(racePlanService *service.RacePlanService) *RacePlanHandler {
	return &RacePlanHandler{
		racePlanService: racePlanService,
	}
}

func (h *RacePlanHandler) RegisterHandlers(api *operations.SharplAPIAPI) {
	api.RacePlansGetRacePlansHandler = race_plans.GetRacePlansHandlerFunc(h.GetRacePlans)
	api.RacePlansGetRacePlanHandler = race_plans.GetRacePlanHandlerFunc(h.GetRacePlan)
	api.RacePlansFilterRacePlansHandler = race_plans.FilterRacePlansHandlerFunc(h.FilterRacePlans)
	api.RacePlansEnrollInRacePlanHandler = race_plans.EnrollInRacePlanHandlerFunc(h.EnrollInRacePlan)
	api.RacePlansGetMyEnrollmentsHandler = race_plans.GetMyEnrollmentsHandlerFunc(h.GetMyEnrollments)
	api.RacePlansUnenrollFromRacePlanHandler = race_plans.UnenrollFromRacePlanHandlerFunc(h.UnenrollFromRacePlan)
}
