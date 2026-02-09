
# RacesResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`data` | [Array&lt;RaceData&gt;](RaceData.md)

## Example

```typescript
import type { RacesResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": Races retrieved successfully,
  "data": null,
} satisfies RacesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RacesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


