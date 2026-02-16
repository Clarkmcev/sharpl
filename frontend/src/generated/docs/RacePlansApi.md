# RacePlansApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**filterRacePlans**](RacePlansApi.md#filterraceplans) | **GET** /race-plans/filter | Filter race plans |
| [**getRacePlan**](RacePlansApi.md#getraceplan) | **GET** /race-plans/{planId} | Get a race plan |
| [**getRacePlans**](RacePlansApi.md#getraceplans) | **GET** /race-plans | Get all race plans |



## filterRacePlans

> RacePlansResponse filterRacePlans(raceType, distance, experienceLevel)

Filter race plans

Filter race plans by race type, distance, and experience level

### Example

```ts
import {
  Configuration,
  RacePlansApi,
} from '';
import type { FilterRacePlansRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RacePlansApi();

  const body = {
    // string | Filter by race type (running or triathlon) (optional)
    raceType: raceType_example,
    // string | Filter by distance (5K, 10K, Half Marathon, Marathon, Sprint, Olympic, Half Ironman, Ironman) (optional)
    distance: distance_example,
    // string | Filter by experience level (beginner, intermediate, advanced) (optional)
    experienceLevel: experienceLevel_example,
  } satisfies FilterRacePlansRequest;

  try {
    const data = await api.filterRacePlans(body);
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
| **raceType** | `string` | Filter by race type (running or triathlon) | [Optional] [Defaults to `undefined`] |
| **distance** | `string` | Filter by distance (5K, 10K, Half Marathon, Marathon, Sprint, Olympic, Half Ironman, Ironman) | [Optional] [Defaults to `undefined`] |
| **experienceLevel** | `string` | Filter by experience level (beginner, intermediate, advanced) | [Optional] [Defaults to `undefined`] |

### Return type

[**RacePlansResponse**](RacePlansResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race plans retrieved successfully |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRacePlan

> RacePlanResponse getRacePlan(planId)

Get a race plan

Retrieve a specific race plan by ID

### Example

```ts
import {
  Configuration,
  RacePlansApi,
} from '';
import type { GetRacePlanRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RacePlansApi();

  const body = {
    // number | Race plan ID
    planId: 789,
  } satisfies GetRacePlanRequest;

  try {
    const data = await api.getRacePlan(body);
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
| **planId** | `number` | Race plan ID | [Defaults to `undefined`] |

### Return type

[**RacePlanResponse**](RacePlanResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race plan retrieved successfully |  -  |
| **404** | Race plan not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRacePlans

> RacePlansResponse getRacePlans()

Get all race plans

Retrieve all available race training plans

### Example

```ts
import {
  Configuration,
  RacePlansApi,
} from '';
import type { GetRacePlansRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RacePlansApi();

  try {
    const data = await api.getRacePlans();
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

[**RacePlansResponse**](RacePlansResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Race plans retrieved successfully |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

