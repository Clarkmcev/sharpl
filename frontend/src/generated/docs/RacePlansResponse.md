
# RacePlansResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`data` | [Array&lt;RacePlan&gt;](RacePlan.md)

## Example

```typescript
import type { RacePlansResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": Race plans retrieved successfully,
  "data": null,
} satisfies RacePlansResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RacePlansResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


