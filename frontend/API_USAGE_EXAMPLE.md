# Using the Generated API Client

The API client is generated from the OpenAPI specification using `openapi-generator`.

## Installation

The generated code is already in `src/generated/`. No additional installation needed.

## Basic Usage

### 1. Import the API classes and types

```typescript
import { 
  OnboardingApi, 
  OnboardingData, 
  Race,
  Configuration 
} from './generated';
```

### 2. Configure the API client

```typescript
const config = new Configuration({
  basePath: 'http://localhost:8080',
  accessToken: () => {
    // Return the JWT token from your auth state
    return localStorage.getItem('token') || '';
  }
});

const onboardingApi = new OnboardingApi(config);
```

### 3. Use the API methods

#### Submit Onboarding Data

```typescript
const onboardingData: OnboardingData = {
  sport: 'Running',
  experienceLevel: 'Intermediate',
  weeklyTrainingHours: 5,
  preparingForRace: true,
  races: [
    {
      name: 'Boston Marathon',
      discipline: 'Running',
      distance: '42.195km',
      date: new Date('2026-04-20'),
      goal: 'Finish under 4 hours'
    }
  ],
  currentVolume: '40km per week',
  longestRun: '20km',
  recentRaces: 'Half marathon in October 2025',
  injuries: 'None currently',
  trainingDays: 5,
  preferredWorkoutTime: 'Morning',
  gymAccess: true,
  crossTraining: ['Cycling', 'Swimming']
};

try {
  const response = await onboardingApi.completeOnboarding({
    onboardingData
  });
  console.log('Success:', response.message);
} catch (error) {
  console.error('Error:', error);
}
```

#### Get Onboarding Data

```typescript
try {
  const response = await onboardingApi.getOnboarding();
  console.log('Onboarding data:', response.data);
} catch (error) {
  console.error('Error:', error);
}
```

## Type Safety Features

The generated client provides:

✅ **Full TypeScript types** - All models and API methods are fully typed
✅ **Runtime validation** - `instanceOfOnboardingData()` helper for type checking
✅ **Enum support** - `RaceDisciplineEnum` for discipline values
✅ **JSON serialization** - Automatic conversion with `OnboardingDataToJSON()` and `OnboardingDataFromJSON()`
✅ **Date handling** - Automatic Date object conversion for date fields
✅ **Bearer token support** - Built-in JWT authentication

## Available APIs

- `OnboardingApi` - Onboarding operations
- `AuthApi` - Authentication operations
- `UsersApi` - User management operations
- `HealthApi` - Health check operations

## Regenerating the Client

When the OpenAPI spec changes, regenerate the client:

```bash
./generate-all.sh
```

This will regenerate both frontend and backend code from `openapi.yaml`.
