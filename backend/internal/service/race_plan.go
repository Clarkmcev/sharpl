package service

import (
	"errors"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
	"time"
)

type RacePlanService struct {
	repo           repositories.RacePlanRepository
	enrollmentRepo *repositories.TrainingEnrollmentRepository
}

func NewRacePlanService(repo repositories.RacePlanRepository, enrollmentRepo *repositories.TrainingEnrollmentRepository) *RacePlanService {
	return &RacePlanService{
		repo:           repo,
		enrollmentRepo: enrollmentRepo,
	}
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

func (s *RacePlanService) EnrollUser(userID uint, racePlanID uint, startDate *time.Time, targetRaceDate *time.Time) (*models.TrainingEnrollment, error) {
	// Check if plan exists
	plan, err := s.repo.FindByID(racePlanID)
	if err != nil {
		return nil, errors.New("race plan not found")
	}
	if plan == nil {
		return nil, errors.New("race plan not found")
	}

	// Check if user is already enrolled in this plan
	exists, err := s.enrollmentRepo.CheckExistingEnrollment(userID, racePlanID)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("user is already enrolled in this plan")
	}

	// Create enrollment
	enrollment := &models.TrainingEnrollment{
		UserID:         userID,
		RacePlanID:     racePlanID,
		Status:         "active",
		StartDate:      startDate,
		TargetRaceDate: targetRaceDate,
	}

	err = s.enrollmentRepo.Create(enrollment)
	if err != nil {
		return nil, err
	}

	return enrollment, nil
}

func (s *RacePlanService) GetUserEnrollments(userID uint) ([]models.TrainingEnrollment, error) {
	return s.enrollmentRepo.GetByUserID(userID)
}

func (s *RacePlanService) GetActiveEnrollments(userID uint) ([]models.TrainingEnrollment, error) {
	return s.enrollmentRepo.GetActiveByUserID(userID)
}

func (s *RacePlanService) UnenrollUser(userID uint, racePlanID uint) error {
	// Check if user is enrolled in this plan
	exists, err := s.enrollmentRepo.CheckExistingEnrollment(userID, racePlanID)
	if err != nil {
		return err
	}
	if !exists {
		return errors.New("enrollment not found")
	}

	// Unenroll user
	return s.enrollmentRepo.UnenrollUser(userID, racePlanID)
}
