
# RaceData


## Properties

Name | Type
------------ | -------------
`id` | number
`userId` | number
`name` | string
`discipline` | string
`distance` | string
`date` | Date
`goal` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { RaceData } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "userId": 1,
  "name": Boston Marathon,
  "discipline": Running,
  "distance": 42.195km,
  "date": 2026-04-20T00:00Z,
  "goal": Finish under 4 hours,
  "createdAt": null,
  "updatedAt": null,
} satisfies RaceData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RaceData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


