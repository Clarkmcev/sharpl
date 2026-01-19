package models

import (
	"database/sql/driver"
	"encoding/json"
	"time"

	"sharpl-backend/generated"
)

type Onboarding struct {
	ID        uint                    `gorm:"primaryKey" json:"id"`
	UserID    uint                    `gorm:"uniqueIndex;not null" json:"user_id"`
	Data      OnboardingDataJSON      `gorm:"type:jsonb;not null" json:"data"`
	CreatedAt time.Time               `json:"created_at"`
	UpdatedAt time.Time               `json:"updated_at"`
}

type OnboardingDataJSON generated.OnboardingData

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
