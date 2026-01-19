package handlers

import (
	"net/http"
	"sharpl-backend/generated"
	"sharpl-backend/internal/models"
	"sharpl-backend/internal/repositories"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type OnboardingHandler struct {
	onboardingRepo repositories.OnboardingRepository
}

func NewOnboardingHandler(onboardingRepo repositories.OnboardingRepository) *OnboardingHandler {
	return &OnboardingHandler{
		onboardingRepo: onboardingRepo,
	}
}

func (h *OnboardingHandler) CompleteOnboarding(c *gin.Context) {
	var req generated.OnboardingData
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := getUserIDFromContext(c)
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	onboarding := &models.Onboarding{
		UserID: userID,
		Data:   models.OnboardingDataJSON(req),
	}

	if err := h.onboardingRepo.Upsert(onboarding); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save onboarding data"})
		return
	}

	c.JSON(http.StatusOK, generated.OnboardingResponse{
		Message: "Onboarding data saved successfully",
		Data:    req,
	})
}

func (h *OnboardingHandler) GetOnboarding(c *gin.Context) {
	userID := getUserIDFromContext(c)
	if userID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	onboarding, err := h.onboardingRepo.GetByUserID(userID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Onboarding data not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve onboarding data"})
		return
	}

	c.JSON(http.StatusOK, generated.OnboardingResponse{
		Message: "Onboarding data retrieved successfully",
		Data:    generated.OnboardingData(onboarding.Data),
	})
}

func getUserIDFromContext(c *gin.Context) uint {
	userIDVal, exists := c.Get("user_id")
	if !exists {
		return 1
	}
	userID, ok := userIDVal.(uint)
	if !ok {
		return 1
	}
	return userID
}
