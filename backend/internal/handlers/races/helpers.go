package handlers

import (
	"net/http"

	generatedModels "sharpl-backend/generated/models"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
)

func NewJSONResponse(statusCode int, payload interface{}) middleware.Responder {
	return middleware.ResponderFunc(func(w http.ResponseWriter, _ runtime.Producer) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(statusCode)

		if payload != nil {
			producer := runtime.JSONProducer()
			if err := producer.Produce(w, payload); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
			}
		}
	})
}

func convertErrorToResponse(err error) generatedModels.ErrorResponse {
	return generatedModels.ErrorResponse{
		Error: err.Error(),
	}
}
