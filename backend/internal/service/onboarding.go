package service

import (
	"errors"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
)

type OnboardingService struct {
	onboardingRepo repositories.OnboardingRepository
}

func NewOnboardingService(onboardingRepo repositories.OnboardingRepository) *OnboardingService {
	return &OnboardingService{
		onboardingRepo: onboardingRepo,
	}
}

func (s *OnboardingService) SaveOnboarding(userID uint, data models.OnboardingDataJSON) (*models.Onboarding, error) {
	onboarding := &models.Onboarding{
		UserID: userID,
		Data:   data,
	}

	if err := s.onboardingRepo.Upsert(onboarding); err != nil {
		return nil, errors.New("Failed to save onboarding data")
	}

	return onboarding, nil
}

func (s *OnboardingService) GetOnboarding(userID uint) (*models.Onboarding, error) {
	onboarding, err := s.onboardingRepo.GetByUserID(userID)
	if err != nil {
		return nil, errors.New("Onboarding data not found")
	}

	return onboarding, nil
}
