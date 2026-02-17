# RacePlansApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enrollInRacePlan**](RacePlansApi.md#enrollinraceplan) | **POST** /race-plans/{planId}/enroll | Enroll user in a training plan |
| [**filterRacePlans**](RacePlansApi.md#filterraceplans) | **GET** /race-plans/filter | Filter race plans |
| [**getMyEnrollments**](RacePlansApi.md#getmyenrollments) | **GET** /my-enrollments | Get user\&#39;s enrolled training plans |
| [**getRacePlan**](RacePlansApi.md#getraceplan) | **GET** /race-plans/{planId} | Get a race plan |
| [**getRacePlans**](RacePlansApi.md#getraceplans) | **GET** /race-plans | Get all race plans |



## enrollInRacePlan

> EnrollmentResponse enrollInRacePlan(planId, body)

Enroll user in a training plan

Enroll the authenticated user in a specific race training plan

### Example

```ts
import {
  Configuration,
  RacePlansApi,
} from '';
import type { EnrollInRacePlanRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacePlansApi(config);

  const body = {
    // number | Race plan ID
    planId: 789,
    // EnrollmentRequest | Enrollment details
    body: ...,
  } satisfies EnrollInRacePlanRequest;

  try {
    const data = await api.enrollInRacePlan(body);
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
| **body** | [EnrollmentRequest](EnrollmentRequest.md) | Enrollment details | |

### Return type

[**EnrollmentResponse**](EnrollmentResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successfully enrolled in race plan |  -  |
| **400** | Bad request |  -  |
| **404** | Race plan not found |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


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


## getMyEnrollments

> MyEnrollmentsResponse getMyEnrollments()

Get user\&#39;s enrolled training plans

Retrieve all training plans the authenticated user is enrolled in

### Example

```ts
import {
  Configuration,
  RacePlansApi,
} from '';
import type { GetMyEnrollmentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new RacePlansApi(config);

  try {
    const data = await api.getMyEnrollments();
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

[**MyEnrollmentsResponse**](MyEnrollmentsResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User enrollments retrieved successfully |  -  |
| **401** | Unauthorized |  -  |
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

