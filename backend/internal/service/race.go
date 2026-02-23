package service

import (
	"errors"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"
)

type RaceService struct {
	raceRepo repositories.RaceRepository
}

func NewRaceService(raceRepo repositories.RaceRepository) *RaceService {
	return &RaceService{
		raceRepo: raceRepo,
	}
}

func (s *RaceService) CreateRace(race *models.Race) error {
	return s.raceRepo.Create(race)
}

func (s *RaceService) UpdateRace(race *models.Race) error {
	existing, err := s.raceRepo.GetByID(race.ID)
	if err != nil {
		return errors.New("Race not found")
	}

	if existing.UserID != race.UserID {
		return errors.New("Unauthorized to update this race")
	}

	return s.raceRepo.Update(race)
}

func (s *RaceService) DeleteRace(raceID uint, userID uint) error {
	existing, err := s.raceRepo.GetByID(raceID)
	if err != nil {
		return errors.New("Race not found")
	}

	if existing.UserID != userID {
		return errors.New("Unauthorized to delete this race")
	}

	return s.raceRepo.Delete(raceID, userID)
}

func (s *RaceService) GetRaceByID(raceID uint, userID uint) (*models.Race, error) {
	race, err := s.raceRepo.GetByID(raceID)
	if err != nil {
		return nil, errors.New("Race not found")
	}

	if race.UserID != userID {
		return nil, errors.New("Unauthorized to view this race")
	}

	return race, nil
}

func (s *RaceService) GetUserRaces(userID uint) ([]models.Race, error) {
	return s.raceRepo.GetByUserID(userID)
}
