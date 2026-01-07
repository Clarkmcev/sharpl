package database

import (
"fmt"
"log"
"os"

"gorm.io/driver/postgres"
"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
host := getEnv("DB_HOST", "localhost")
port := getEnv("DB_PORT", "5432")
user := getEnv("DB_USER", "sharpl_user")
password := getEnv("DB_PASSWORD", "sharpl_password")
dbname := getEnv("DB_NAME", "sharpl_db")

dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
host, port, user, password, dbname)

var err error
DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
if err != nil {
return fmt.Errorf("failed to connect to database: %w", err)
}

log.Println("Database connected successfully")
return nil
}

func GetDB() *gorm.DB {
return DB
}

func getEnv(key, defaultValue string) string {
if value := os.Getenv(key); value != "" {
return value
}
return defaultValue
}
