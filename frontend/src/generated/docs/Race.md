
# Race


## Properties

Name | Type
------------ | -------------
`name` | string
`discipline` | string
`distance` | string
`date` | Date
`goal` | string

## Example

```typescript
import type { Race } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Boston Marathon,
  "discipline": Running,
  "distance": 42.195km,
  "date": Mon Apr 20 00:00:00 UTC 2026,
  "goal": Finish under 4 hours,
} satisfies Race

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Race
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


