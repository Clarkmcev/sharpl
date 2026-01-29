import {
  Configuration,
  AuthApi,
  UsersApi,
  HealthApi,
  OnboardingApi,
} from "../generated";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Configure API client with base URL and auth token
const getConfiguration = () => {
  const token = localStorage.getItem("authToken");
  return new Configuration({
    basePath: API_BASE_URL,
    accessToken: token ? async () => token : undefined,
    middleware: [
      {
        post: async (context) => {
          if (context.response.status === 401) {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          }
        },
      },
    ],
  });
};

export const authApi = new AuthApi(getConfiguration());
export const usersApi = new UsersApi(getConfiguration());
export const healthApi = new HealthApi(getConfiguration());
export const onboardingApi = new OnboardingApi(getConfiguration());
