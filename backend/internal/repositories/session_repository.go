package repositories

import (
	"sharpl-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type SessionRepository interface {
	Create(session *models.Session) error
	GetByToken(token string) (*models.Session, error)
	DeleteByToken(token string) error
	DeleteExpired() error
	DeleteByUserID(userID uint) error
}

type sessionRepository struct {
	db *gorm.DB
}

func NewSessionRepository(db *gorm.DB) SessionRepository {
	return &sessionRepository{db: db}
}

func (r *sessionRepository) Create(session *models.Session) error {
	return r.db.Create(session).Error
}

func (r *sessionRepository) GetByToken(token string) (*models.Session, error) {
	var session models.Session
	err := r.db.Where("token = ? AND expires_at > ?", token, time.Now()).First(&session).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *sessionRepository) DeleteByToken(token string) error {
	return r.db.Where("token = ?", token).Delete(&models.Session{}).Error
}

func (r *sessionRepository) DeleteExpired() error {
	return r.db.Where("expires_at < ?", time.Now()).Delete(&models.Session{}).Error
}

func (r *sessionRepository) DeleteByUserID(userID uint) error {
	return r.db.Where("user_id = ?", userID).Delete(&models.Session{}).Error
}
