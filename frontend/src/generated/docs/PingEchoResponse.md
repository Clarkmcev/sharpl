
# PingEchoResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`time` | Date
`received` | { [key: string]: any; }

## Example

```typescript
import type { PingEchoResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": pong,
  "time": null,
  "received": null,
} satisfies PingEchoResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PingEchoResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


