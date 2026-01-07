import { put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  completeOnboardingRequest,
  completeOnboardingSuccess,
  completeOnboardingFailure,
  type OnboardingData,
} from "../slices/onboardingSlice";

// Simulated API call - replace with actual API endpoint
function* completeOnboardingSaga(
  action: PayloadAction<OnboardingData>
): Generator<any, void, any> {
  try {
    // TODO: Replace with actual API call when backend endpoint is ready
    // const response = yield call(api.onboarding.complete, action.payload);

    // For now, simulate API call
    yield new Promise((resolve) => setTimeout(resolve, 1000));

    // Store in localStorage as backup
    localStorage.setItem("onboardingData", JSON.stringify(action.payload));

    yield put(completeOnboardingSuccess(action.payload));
  } catch (error: any) {
    yield put(
      completeOnboardingFailure(
        error.message || "Failed to save onboarding data"
      )
    );
  }
}

export default function* onboardingSaga() {
  yield takeLatest(completeOnboardingRequest.type, completeOnboardingSaga);
}
