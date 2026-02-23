import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, LoginRequest, RegisterRequest } from "../../generated";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
  registrationSuccess: false,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginRequest: (state, _: PayloadAction<LoginRequest>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string; message: string }>,
    ) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Register actions
    registerRequest: (state, _: PayloadAction<RegisterRequest>) => {
      state.loading = true;
      state.error = null;
      state.registrationSuccess = false;
    },
    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.registrationSuccess = true;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.registrationSuccess = false;
    },

    // Logout actions
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authToken");
    },

    // Whoami actions
    whoamiRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    whoamiSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    whoamiFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    // Other actions
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  whoamiRequest,
  whoamiSuccess,
  whoamiFailure,
  clearError,
  setCredentials,
} = authSlice.actions;

export default authSlice.reducer;
