
# OnboardingData


## Properties

Name | Type
------------ | -------------
`sport` | string
`experienceLevel` | string
`weeklyTrainingHours` | number
`preparingForRace` | boolean
`races` | [Array&lt;Race&gt;](Race.md)
`currentVolume` | string
`longestRun` | string
`recentRaces` | string
`injuries` | string
`trainingDays` | number
`preferredWorkoutTime` | string
`gymAccess` | boolean
`crossTraining` | Array&lt;string&gt;

## Example

```typescript
import type { OnboardingData } from ''

// TODO: Update the object below with actual values
const example = {
  "sport": Running,
  "experienceLevel": Intermediate,
  "weeklyTrainingHours": 5,
  "preparingForRace": true,
  "races": [{name=Boston Marathon, discipline=Running, distance=42.195km, date=2026-04-20, goal=Finish under 4 hours}],
  "currentVolume": 40km per week,
  "longestRun": 20km,
  "recentRaces": Half marathon in October 2025,
  "injuries": None currently,
  "trainingDays": 5,
  "preferredWorkoutTime": Morning,
  "gymAccess": true,
  "crossTraining": [Cycling, Swimming],
} satisfies OnboardingData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OnboardingData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


