package handlers

import (
	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/generated/restapi/operations/onboarding"
	"sharpl-backend/internal/service"
)

type OnboardingHandler struct {
	onboardingService *service.OnboardingService
	authService       *service.AuthService
}

func NewOnboardingHandler(onboardingService *service.OnboardingService, authService *service.AuthService) *OnboardingHandler {
	return &OnboardingHandler{
		onboardingService: onboardingService,
		authService:       authService,
	}
}

// RegisterHandlers registers onboarding handlers
func (h *OnboardingHandler) RegisterHandlers(api *operations.SharplAPIAPI) {
	api.OnboardingCompleteOnboardingHandler = onboarding.CompleteOnboardingHandlerFunc(h.CompleteOnboarding)
	api.OnboardingGetOnboardingHandler = onboarding.GetOnboardingHandlerFunc(h.GetOnboarding)
}
