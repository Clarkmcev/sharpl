# OnboardingApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**completeOnboarding**](OnboardingApi.md#completeonboarding) | **POST** /onboarding | Complete user onboarding |
| [**getOnboarding**](OnboardingApi.md#getonboarding) | **GET** /onboarding | Get user onboarding data |



## completeOnboarding

> OnboardingResponse completeOnboarding(body)

Complete user onboarding

Save user onboarding data including sport preferences, goals, and training preferences

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '';
import type { CompleteOnboardingRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new OnboardingApi(config);

  const body = {
    // OnboardingData
    body: ...,
  } satisfies CompleteOnboardingRequest;

  try {
    const data = await api.completeOnboarding(body);
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
| **body** | [OnboardingData](OnboardingData.md) |  | |

### Return type

[**OnboardingResponse**](OnboardingResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Onboarding data saved successfully |  -  |
| **400** | Invalid request data |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOnboarding

> OnboardingResponse getOnboarding()

Get user onboarding data

Retrieve the current user\&#39;s onboarding data

### Example

```ts
import {
  Configuration,
  OnboardingApi,
} from '';
import type { GetOnboardingRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // To configure API key authorization: JWT
    apiKey: "YOUR API KEY",
  });
  const api = new OnboardingApi(config);

  try {
    const data = await api.getOnboarding();
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

[**OnboardingResponse**](OnboardingResponse.md)

### Authorization

[JWT](../README.md#JWT)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Onboarding data retrieved successfully |  -  |
| **404** | Onboarding data not found |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

