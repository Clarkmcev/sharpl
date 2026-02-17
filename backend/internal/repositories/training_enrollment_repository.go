package repositories

import (
	"sharpl-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type TrainingEnrollmentRepository struct {
	db *gorm.DB
}

func NewTrainingEnrollmentRepository(db *gorm.DB) *TrainingEnrollmentRepository {
	return &TrainingEnrollmentRepository{db: db}
}

func (r *TrainingEnrollmentRepository) Create(enrollment *models.TrainingEnrollment) error {
	return r.db.Create(enrollment).Error
}

func (r *TrainingEnrollmentRepository) GetByID(id uint) (*models.TrainingEnrollment, error) {
	var enrollment models.TrainingEnrollment
	err := r.db.Preload("User").Preload("RacePlan").First(&enrollment, id).Error
	return &enrollment, err
}

func (r *TrainingEnrollmentRepository) GetByUserID(userID uint) ([]models.TrainingEnrollment, error) {
	var enrollments []models.TrainingEnrollment
	err := r.db.Where("user_id = ?", userID).Preload("RacePlan").Find(&enrollments).Error
	return enrollments, err
}

func (r *TrainingEnrollmentRepository) GetActiveByUserID(userID uint) ([]models.TrainingEnrollment, error) {
	var enrollments []models.TrainingEnrollment
	err := r.db.Where("user_id = ? AND status = ?", userID, "active").Preload("RacePlan").Find(&enrollments).Error
	return enrollments, err
}

func (r *TrainingEnrollmentRepository) Update(enrollment *models.TrainingEnrollment) error {
	return r.db.Save(enrollment).Error
}

func (r *TrainingEnrollmentRepository) CheckExistingEnrollment(userID uint, racePlanID uint) (bool, error) {
	var count int64
	err := r.db.Model(&models.TrainingEnrollment{}).
		Where("user_id = ? AND race_plan_id = ? AND status = ?", userID, racePlanID, "active").
		Count(&count).Error
	return count > 0, err
}

func (r *TrainingEnrollmentRepository) CompleteEnrollment(id uint) error {
	now := time.Now()
	return r.db.Model(&models.TrainingEnrollment{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"status":       "completed",
			"completed_at": now,
		}).Error
}

func (r *TrainingEnrollmentRepository) UnenrollUser(userID uint, racePlanID uint) error {
	return r.db.Where("user_id = ? AND race_plan_id = ? AND status = ?", userID, racePlanID, "active").
		Delete(&models.TrainingEnrollment{}).Error
}
