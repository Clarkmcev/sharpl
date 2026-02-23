package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"
)

type RacePlan struct {
	ID               uint                   `gorm:"primaryKey" json:"id"`
	Name             string                 `gorm:"not null" json:"name"`
	RaceType         string                 `gorm:"not null;index" json:"race_type"`
	Distance         string                 `gorm:"not null;index" json:"distance"`
	Discipline       string                 `json:"discipline"`
	DurationWeeks    int                    `gorm:"not null" json:"duration_weeks"`
	ExperienceLevel  string                 `gorm:"not null;index" json:"experience_level"`
	Description      string                 `json:"description"`
	WeeklyStructure  WeeklyStructureJSON    `gorm:"type:jsonb" json:"weekly_structure"`
	CreatedAt        time.Time              `json:"created_at"`
	UpdatedAt        time.Time              `json:"updated_at"`
}

type WeeklyStructureJSON struct {
	Weeks []WeekDetail `json:"weeks"`
}

type WeekDetail struct {
	Week        int    `json:"week"`
	Description string `json:"description"`
}

func (w WeeklyStructureJSON) Value() (driver.Value, error) {
	return json.Marshal(w)
}

func (w *WeeklyStructureJSON) Scan(value interface{}) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return nil
	}
	return json.Unmarshal(bytes, w)
}
