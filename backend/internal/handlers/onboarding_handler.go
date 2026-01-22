package handlers

import (
	"sharpl-backend/internal/repositories"
)

type OnboardingHandler struct {
	onboardingRepo repositories.OnboardingRepository
}

func NewOnboardingHandler(onboardingRepo repositories.OnboardingRepository) *OnboardingHandler {
	return &OnboardingHandler{
		onboardingRepo: onboardingRepo,
	}
}
