import { put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  completeOnboardingRequest,
  completeOnboardingSuccess,
  completeOnboardingFailure,
} from "../slices/onboardingSlice";
import type { OnboardingData } from "../../generated";
import { onboardingApi } from "../../api/client";

// Simulated API call - replace with actual API endpoint
function* completeOnboardingSaga(action: PayloadAction<OnboardingData>) {
  try {
    yield onboardingApi.completeOnboarding({ onboardingData: action.payload });
    yield put(completeOnboardingSuccess(action.payload));
  } catch (error: any) {
    yield put(
      completeOnboardingFailure(
        error.message || "Failed to save onboarding data",
      ),
    );
  }
}

export default function* onboardingSaga() {
  yield takeLatest(completeOnboardingRequest.type, completeOnboardingSaga);
}
