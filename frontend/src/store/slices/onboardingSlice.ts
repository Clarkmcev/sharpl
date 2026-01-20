import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OnboardingData } from "../../generated";

export interface Race {
  name: string;
  discipline: "Running" | "Triathlon";
  distance: string;
  date: string;
  goal: string;
}

interface OnboardingState {
  completed: boolean;
  data: OnboardingData | null;
  loading: boolean;
  error: string | null;
}

const loadOnboardingData = (): OnboardingData | null => {
  try {
    const stored = localStorage.getItem("onboardingData");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState: OnboardingState = {
  completed: !!loadOnboardingData(),
  data: loadOnboardingData(),
  loading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    completeOnboardingRequest: (
      state,
      _action: PayloadAction<OnboardingData>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    completeOnboardingSuccess: (
      state,
      action: PayloadAction<OnboardingData>,
    ) => {
      state.loading = false;
      state.completed = true;
      state.data = action.payload;
      state.error = null;
    },
    completeOnboardingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetOnboarding: (state) => {
      state.completed = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  completeOnboardingRequest,
  completeOnboardingSuccess,
  completeOnboardingFailure,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
