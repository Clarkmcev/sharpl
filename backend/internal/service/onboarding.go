package service

import (
	"errors"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
	"time"
)

type OnboardingService struct {
	onboardingRepo repositories.OnboardingRepository
	raceRepo       repositories.RaceRepository
}

func NewOnboardingService(onboardingRepo repositories.OnboardingRepository, raceRepo repositories.RaceRepository) *OnboardingService {
	return &OnboardingService{
		onboardingRepo: onboardingRepo,
		raceRepo:       raceRepo,
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

	for _, raceData := range data.Races {
		date, err := time.Parse("2006-01-02", raceData.Date)
		if err != nil {
			date, err = time.Parse(time.RFC3339, raceData.Date)
			if err != nil {
				continue
			}
		}

		race := &models.Race{
			UserID:     userID,
			Name:       raceData.Name,
			Discipline: raceData.Discipline,
			Distance:   raceData.Distance,
			Date:       date,
			Goal:       raceData.Goal,
		}

		if err := s.raceRepo.Create(race); err != nil {
			continue
		}
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
