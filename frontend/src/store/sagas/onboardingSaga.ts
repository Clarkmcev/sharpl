import { put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOnboardingRequest,
  fetchOnboardingSuccess,
  fetchOnboardingFailure,
  completeOnboardingRequest,
  completeOnboardingSuccess,
  completeOnboardingFailure,
} from "../slices/onboardingSlice";
import type { OnboardingData } from "../../generated";
import { onboardingApi } from "../../api/client";

function* fetchOnboardingSaga() {
  try {
    const response: { data: OnboardingData } = yield onboardingApi.getOnboarding();
    yield put(fetchOnboardingSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchOnboardingFailure(
        error.message || "Failed to fetch onboarding data",
      ),
    );
  }
}

function* completeOnboardingSaga(action: PayloadAction<OnboardingData>) {
  try {
    yield onboardingApi.completeOnboarding({ body: action.payload });
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
  yield takeLatest(fetchOnboardingRequest.type, fetchOnboardingSaga);
  yield takeLatest(completeOnboardingRequest.type, completeOnboardingSaga);
}
