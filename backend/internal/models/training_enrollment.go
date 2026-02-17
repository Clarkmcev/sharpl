package models

import (
	"time"
)

type TrainingEnrollment struct {
	ID             uint       `gorm:"primaryKey" json:"id"`
	UserID         uint       `gorm:"not null;index" json:"user_id"`
	RacePlanID     uint       `gorm:"not null;index" json:"race_plan_id"`
	EnrolledAt     time.Time  `gorm:"default:CURRENT_TIMESTAMP" json:"enrolled_at"`
	Status         string     `gorm:"default:'active';index" json:"status"`
	StartDate      *time.Time `json:"start_date,omitempty"`
	TargetRaceDate *time.Time `json:"target_race_date,omitempty"`
	CompletedAt    *time.Time `json:"completed_at,omitempty"`
	CreatedAt      time.Time  `json:"created_at"`
	UpdatedAt      time.Time  `json:"updated_at"`
	
	User     User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	RacePlan RacePlan `gorm:"foreignKey:RacePlanID" json:"race_plan,omitempty"`
}
