package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/generated/restapi/operations/races"
	"sharpl-backend/internal/service"
)

type RaceHandler struct {
	raceService *service.RaceService
}

func NewRaceHandler(raceService *service.RaceService) *RaceHandler {
	return &RaceHandler{
		raceService: raceService,
	}
}

func (h *RaceHandler) RegisterHandlers(api *operations.SharplAPIAPI) {
	api.RacesCreateRaceHandler = races.CreateRaceHandlerFunc(h.CreateRace)
	api.RacesGetRacesHandler = races.GetRacesHandlerFunc(h.GetRaces)
	api.RacesGetRaceHandler = races.GetRaceHandlerFunc(h.GetRace)
	api.RacesUpdateRaceHandler = races.UpdateRaceHandlerFunc(h.UpdateRace)
	api.RacesDeleteRaceHandler = races.DeleteRaceHandlerFunc(h.DeleteRace)
}
