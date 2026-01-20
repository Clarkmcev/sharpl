package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"
)

type Onboarding struct {
	ID        uint                `gorm:"primaryKey" json:"id"`
	UserID    uint                `gorm:"uniqueIndex;not null" json:"user_id"`
	Data      OnboardingDataJSON  `gorm:"type:jsonb;not null" json:"data"`
	CreatedAt time.Time           `json:"created_at"`
	UpdatedAt time.Time           `json:"updated_at"`
}

type OnboardingDataJSON struct {
	Sport                string   `json:"sport"`
	ExperienceLevel      string   `json:"experienceLevel"`
	WeeklyTrainingHours  int64    `json:"weeklyTrainingHours"`
	PreparingForRace     bool     `json:"preparingForRace"`
	Races                []Race   `json:"races"`
	CurrentVolume        string   `json:"currentVolume"`
	LongestRun           string   `json:"longestRun"`
	RecentRaces          string   `json:"recentRaces"`
	Injuries             string   `json:"injuries"`
	TrainingDays         int64    `json:"trainingDays"`
	PreferredWorkoutTime string   `json:"preferredWorkoutTime"`
	GymAccess            bool     `json:"gymAccess"`
	CrossTraining        []string `json:"crossTraining"`
}

type Race struct {
	Name       string `json:"name"`
	Discipline string `json:"discipline"`
	Distance   string `json:"distance"`
	Date       string `json:"date"`
	Goal       string `json:"goal"`
}

func (o OnboardingDataJSON) Value() (driver.Value, error) {
	return json.Marshal(o)
}

func (o *OnboardingDataJSON) Scan(value interface{}) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return nil
	}
	return json.Unmarshal(bytes, o)
}
