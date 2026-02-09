package models

import "time"

type Race struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	UserID     uint      `gorm:"not null;index" json:"user_id"`
	User       User      `gorm:"foreignKey:UserID" json:"-"`
	Name       string    `gorm:"not null" json:"name"`
	Discipline string    `gorm:"not null" json:"discipline"`
	Distance   string    `gorm:"not null" json:"distance"`
	Date       time.Time `gorm:"not null" json:"date"`
	Goal       string    `json:"goal"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
