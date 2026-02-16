package repositories

import (
	"sharpl-backend/internal/models"

	"gorm.io/gorm"
)

type RacePlanRepository interface {
	FindAll() ([]models.RacePlan, error)
	FindByID(id uint) (*models.RacePlan, error)
	FindByFilters(raceType, distance, experienceLevel string) ([]models.RacePlan, error)
}

type racePlanRepository struct {
	db *gorm.DB
}

func NewRacePlanRepository(db *gorm.DB) RacePlanRepository {
	return &racePlanRepository{db: db}
}

func (r *racePlanRepository) FindAll() ([]models.RacePlan, error) {
	var plans []models.RacePlan
	err := r.db.Find(&plans).Error
	return plans, err
}

func (r *racePlanRepository) FindByID(id uint) (*models.RacePlan, error) {
	var plan models.RacePlan
	err := r.db.First(&plan, id).Error
	if err != nil {
		return nil, err
	}
	return &plan, nil
}

func (r *racePlanRepository) FindByFilters(raceType, distance, experienceLevel string) ([]models.RacePlan, error) {
	var plans []models.RacePlan
	query := r.db

	if raceType != "" {
		query = query.Where("race_type = ?", raceType)
	}
	if distance != "" {
		query = query.Where("distance = ?", distance)
	}
	if experienceLevel != "" {
		query = query.Where("experience_level = ?", experienceLevel)
	}

	err := query.Find(&plans).Error
	return plans, err
}
