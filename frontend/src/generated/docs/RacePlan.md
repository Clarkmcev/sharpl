
# RacePlan


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`raceType` | string
`distance` | string
`discipline` | string
`durationWeeks` | number
`experienceLevel` | string
`description` | string
`weeklyStructure` | [RacePlanWeeklyStructure](RacePlanWeeklyStructure.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { RacePlan } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "name": 5K Beginner - 4 Weeks,
  "raceType": running,
  "distance": 5K,
  "discipline": running,
  "durationWeeks": 4,
  "experienceLevel": beginner,
  "description": A 4-week plan for beginners looking to complete their first 5K.,
  "weeklyStructure": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies RacePlan

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RacePlan
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


