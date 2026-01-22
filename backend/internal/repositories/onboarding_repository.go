package repositories

import (
	"sharpl-backend/internal/models"

	"gorm.io/gorm"
)

type OnboardingRepository interface {
	Create(onboarding *models.Onboarding) error
	Update(onboarding *models.Onboarding) error
	GetByUserID(userID uint) (*models.Onboarding, error)
	Upsert(onboarding *models.Onboarding) error
}

type onboardingRepository struct {
	db *gorm.DB
}

func NewOnboardingRepository(db *gorm.DB) OnboardingRepository {
	return &onboardingRepository{db: db}
}

func (r *onboardingRepository) Create(onboarding *models.Onboarding) error {
	return r.db.Create(onboarding).Error
}

func (r *onboardingRepository) Update(onboarding *models.Onboarding) error {
	return r.db.Save(onboarding).Error
}

func (r *onboardingRepository) GetByUserID(userID uint) (*models.Onboarding, error) {
	var onboarding models.Onboarding
	err := r.db.Where("user_id = ?", userID).First(&onboarding).Error
	if err != nil {
		return nil, err
	}
	return &onboarding, nil
}

func (r *onboardingRepository) Upsert(onboarding *models.Onboarding) error {
	return r.db.Save(onboarding).Error
}
