package handlers

type JSONResponse struct {
	Code    int
	Message interface{}
}

func NewJSONResponse(code int, message interface{}) *JSONResponse {
	return &JSONResponse{
		Code:    code,
		Message: message,
	}
}
