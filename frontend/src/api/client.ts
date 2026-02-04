import {
  Configuration,
  AuthApi,
  UsersApi,
  HealthApi,
  OnboardingApi,
} from "../generated";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_BASE_PATH = "/api/v1";

// Configure API client with base URL and auth token
// Token is fetched dynamically on each API call
const configuration = new Configuration({
  basePath: `${API_BASE_URL}${API_BASE_PATH}`,
  apiKey: async () => {
    const token = localStorage.getItem("authToken") || "";
    return token ? `Bearer ${token}` : "";
  },
  middleware: [
    // {
    //   post: async (context) => {
    //     if (context.response.status === 401) {
    //       localStorage.removeItem("authToken");
    //       window.location.href = "/login";
    //     }
    //   },
    // },
  ],
});

export const authApi = new AuthApi(configuration);
export const usersApi = new UsersApi(configuration);
export const healthApi = new HealthApi(configuration);
export const onboardingApi = new OnboardingApi(configuration);
