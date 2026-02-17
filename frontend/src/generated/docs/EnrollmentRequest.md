
# EnrollmentRequest


## Properties

Name | Type
------------ | -------------
`startDate` | Date
`targetRaceDate` | Date

## Example

```typescript
import type { EnrollmentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "startDate": Mon Jan 15 00:00:00 UTC 2024,
  "targetRaceDate": Fri Mar 15 00:00:00 UTC 2024,
} satisfies EnrollmentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnrollmentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


