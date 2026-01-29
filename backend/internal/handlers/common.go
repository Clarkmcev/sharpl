package handlers

// // AuthenticatedHandler wraps handlers that require authentication
// func AuthenticatedHandler(handler func(*http.Request, *models.User) runtime.Responder) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		user, ok := middleware.GetUserFromContext(r.Context())
// 		if !ok {
// 			w.Header().Set("Content-Type", "application/json")
// 			w.WriteHeader(http.StatusUnauthorized)
// 			w.Write([]byte(`{"error": "User not found in context"}`))
// 			return
// 		}

// 		responder := handler(r, user)
// 		responder.WriteResponse(w, nil)
// 	}
// }
