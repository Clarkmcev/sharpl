
# MyEnrollmentsResponseDataInner


## Properties

Name | Type
------------ | -------------
`enrollmentId` | number
`userId` | number
`racePlan` | [RacePlan](RacePlan.md)
`startDate` | Date
`targetRaceDate` | Date
`status` | string
`enrolledAt` | Date

## Example

```typescript
import type { MyEnrollmentsResponseDataInner } from ''

// TODO: Update the object below with actual values
const example = {
  "enrollmentId": null,
  "userId": null,
  "racePlan": null,
  "startDate": null,
  "targetRaceDate": null,
  "status": null,
  "enrolledAt": null,
} satisfies MyEnrollmentsResponseDataInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MyEnrollmentsResponseDataInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


