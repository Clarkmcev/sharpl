package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/go-openapi/runtime"
)

// JSONResponse is a custom responder for JSON responses
type JSONResponse struct {
	code    int
	payload interface{}
}

func NewJSONResponse(code int, payload interface{}) *JSONResponse {
	return &JSONResponse{code: code, payload: payload}
}

func (o *JSONResponse) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(o.code)
	if o.payload != nil {
		json.NewEncoder(rw).Encode(o.payload)
	}
}
