
# EnrollmentResponseData


## Properties

Name | Type
------------ | -------------
`enrollmentId` | number
`userId` | number
`racePlanId` | number
`startDate` | Date
`targetRaceDate` | Date
`status` | string
`enrolledAt` | Date

## Example

```typescript
import type { EnrollmentResponseData } from ''

// TODO: Update the object below with actual values
const example = {
  "enrollmentId": 1,
  "userId": 1,
  "racePlanId": 5,
  "startDate": Mon Jan 15 00:00:00 UTC 2024,
  "targetRaceDate": Fri Mar 15 00:00:00 UTC 2024,
  "status": active,
  "enrolledAt": null,
} satisfies EnrollmentResponseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnrollmentResponseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


