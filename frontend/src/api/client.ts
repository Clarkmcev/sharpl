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

// export const auth = {
//   login: async (email: string, password: string) => {
//     try {
//       const authApi = new AuthApi(getConfiguration());
//       const response = await authApi.login({
//         loginRequest: { email, password },
//       });
//       if (response.token) {
//         localStorage.setItem("authToken", response.token);
//       }
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   register: async (email: string, password: string, name?: string) => {
//     try {
//       const authApi = new AuthApi(getConfiguration());
//       const response = await authApi.register({
//         registerRequest: { email, password, name },
//       });
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   logout: async () => {
//     const authApi = new AuthApi(getConfiguration());
//     await authApi.logout();
//     localStorage.removeItem("authToken");
//   },
// };

// export const users = {
//   getAll: async () => {
//     try {
//       const usersApi = new UsersApi(getConfiguration());
//       const response = await usersApi.getUsers();
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   getById: async (id: number) => {
//     try {
//       const usersApi = new UsersApi(getConfiguration());
//       const response = await usersApi.getUserById({ id });
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },
// };

// export const health = {
//   check: async () => {
//     try {
//       const healthApi = new HealthApi(getConfiguration());
//       const response = await healthApi.getHealth();
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },
//   ping: async () => {
//     try {
//       const healthApi = new HealthApi(getConfiguration());
//       const response = await healthApi.getPing();
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },
//   pingWithBody: async (body: Record<string, any>) => {
//     try {
//       const healthApi = new HealthApi(getConfiguration());
//       const response = await healthApi.postPing({ requestBody: body });
//       return { data: response, error: null };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },
// };
