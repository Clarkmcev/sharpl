package main

import (
	"log"
	"sharpl-backend/generated/restapi"
	"sharpl-backend/generated/restapi/operations"
	"sharpl-backend/internal/database"
	"sharpl-backend/internal/handlers"
	"sharpl-backend/internal/repositories"
	"sharpl-backend/internal/service"

	loads "github.com/go-openapi/loads"
	"github.com/rs/cors"
)

func main() {
	// Initialize database
	log.Println("Service backend started!")

	if err := database.Connect(); err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize repositories
	userRepo := repositories.NewUserRepository(database.GetDB())
	// onboardingRepo := repositories.NewOnboardingRepository(database.GetDB())

	// Initialize services
	authService := service.SetAuthService(userRepo)

	// Load swagger spec
	swaggerSpec, err := loads.Embedded(restapi.SwaggerJSON, restapi.FlatSwaggerJSON)
	if err != nil {
		log.Fatalln(err)
	}

	// Create new API
	api := operations.NewSharplAPIAPI(swaggerSpec)

	// Configure handlers
	api, err = handlers.ConfigureServices(api, authService)
	if err != nil {
		log.Fatalln("Failed to configure services:", err)
	}

	// Create server
	server := restapi.NewServer(api)
	defer server.Shutdown()

	server.Port = 8080
	server.ConfigureAPI()

	// Add CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	})

	// Get the configured handler and wrap it with CORS
	handler := server.GetHandler()
	server.SetHandler(corsHandler.Handler(handler))

	log.Println("Server starting on :8080")
	if err := server.Serve(); err != nil {
		log.Fatalln(err)
	}
}
