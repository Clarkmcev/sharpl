package service

import (
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
)

type RacePlanService struct {
	repo repositories.RacePlanRepository
}

func NewRacePlanService(repo repositories.RacePlanRepository) *RacePlanService {
	return &RacePlanService{repo: repo}
}

func (s *RacePlanService) GetAllPlans() ([]models.RacePlan, error) {
	return s.repo.FindAll()
}

func (s *RacePlanService) GetPlanByID(id uint) (*models.RacePlan, error) {
	return s.repo.FindByID(id)
}

func (s *RacePlanService) GetPlansByFilters(raceType, distance, experienceLevel string) ([]models.RacePlan, error) {
	return s.repo.FindByFilters(raceType, distance, experienceLevel)
}
