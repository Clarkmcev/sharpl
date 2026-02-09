# RacesApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createRace**](RacesApi.md#createrace) | **POST** /races | Create a race |
| [**deleteRace**](RacesApi.md#deleterace) | **DELETE** /races/{raceId} | Delete a race |
| [**getRace**](RacesApi.md#getrace) | **GET** /races/{raceId} | Get a race |
| [**getRaces**](RacesApi.md#getraces) | **GET** /races | Get user races |
| [**updateRace**](RacesApi.md#updaterace) | **PUT** /races/{raceId} | Update a race |



## createRace

> RaceResponse createRace(body)

Create a race

Create a new race for the current user

### Example

```ts
import {
  Configuration,
  RacesApi,
} from '';
import type { CreateRaceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacesApi(config);

  const body = {
    // RaceInput
    body: ...,
  } satisfies CreateRaceRequest;

  try {
    const data = await api.createRace(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | [RaceInput](RaceInput.md) |  | |

### Return type

[**RaceResponse**](RaceResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Race created successfully |  -  |
| **400** | Invalid request data |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteRace

> MessageResponse deleteRace(raceId)

Delete a race

Delete a race

### Example

```ts
import {
  Configuration,
  RacesApi,
} from '';
import type { DeleteRaceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacesApi(config);

  const body = {
    // number | Race ID
    raceId: 789,
  } satisfies DeleteRaceRequest;

  try {
    const data = await api.deleteRace(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **raceId** | `number` | Race ID | [Defaults to `undefined`] |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race deleted successfully |  -  |
| **404** | Race not found |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRace

> RaceResponse getRace(raceId)

Get a race

Retrieve a specific race by ID

### Example

```ts
import {
  Configuration,
  RacesApi,
} from '';
import type { GetRaceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacesApi(config);

  const body = {
    // number | Race ID
    raceId: 789,
  } satisfies GetRaceRequest;

  try {
    const data = await api.getRace(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **raceId** | `number` | Race ID | [Defaults to `undefined`] |

### Return type

[**RaceResponse**](RaceResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race retrieved successfully |  -  |
| **404** | Race not found |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRaces

> RacesResponse getRaces()

Get user races

Retrieve all races for the current user

### Example

```ts
import {
  Configuration,
  RacesApi,
} from '';
import type { GetRacesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacesApi(config);

  try {
    const data = await api.getRaces();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**RacesResponse**](RacesResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Races retrieved successfully |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateRace

> RaceResponse updateRace(raceId, body)

Update a race

Update an existing race

### Example

```ts
import {
  Configuration,
  RacesApi,
} from '';
import type { UpdateRaceRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacesApi(config);

  const body = {
    // number | Race ID
    raceId: 789,
    // RaceInput
    body: ...,
  } satisfies UpdateRaceRequest;

  try {
    const data = await api.updateRace(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **raceId** | `number` | Race ID | [Defaults to `undefined`] |
| **body** | [RaceInput](RaceInput.md) |  | |

### Return type

[**RaceResponse**](RaceResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race updated successfully |  -  |
| **400** | Invalid request data |  -  |
| **404** | Race not found |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

