
# EnrollmentResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`data` | [EnrollmentResponseData](EnrollmentResponseData.md)

## Example

```typescript
import type { EnrollmentResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": Successfully enrolled in training plan,
  "data": null,
} satisfies EnrollmentResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnrollmentResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


