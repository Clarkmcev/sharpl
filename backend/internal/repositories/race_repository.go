package repositories

import (
	"sharpl-backend/internal/models"

	"gorm.io/gorm"
)

type RaceRepository interface {
	Create(race *models.Race) error
	Update(race *models.Race) error
	Delete(raceID uint, userID uint) error
	GetByID(raceID uint) (*models.Race, error)
	GetByUserID(userID uint) ([]models.Race, error)
	GetAll() ([]models.Race, error)
}

type raceRepository struct {
	db *gorm.DB
}

func NewRaceRepository(db *gorm.DB) RaceRepository {
	return &raceRepository{db: db}
}

func (r *raceRepository) Create(race *models.Race) error {
	return r.db.Create(race).Error
}

func (r *raceRepository) Update(race *models.Race) error {
	return r.db.Save(race).Error
}

func (r *raceRepository) Delete(raceID uint, userID uint) error {
	return r.db.Where("id = ? AND user_id = ?", raceID, userID).Delete(&models.Race{}).Error
}

func (r *raceRepository) GetByID(raceID uint) (*models.Race, error) {
	var race models.Race
	err := r.db.First(&race, raceID).Error
	if err != nil {
		return nil, err
	}
	return &race, nil
}

func (r *raceRepository) GetByUserID(userID uint) ([]models.Race, error) {
	var races []models.Race
	err := r.db.Where("user_id = ?", userID).Order("date ASC").Find(&races).Error
	if err != nil {
		return nil, err
	}
	return races, nil
}

func (r *raceRepository) GetAll() ([]models.Race, error) {
	var races []models.Race
	err := r.db.Find(&races).Error
	if err != nil {
		return nil, err
	}
	return races, nil
}
