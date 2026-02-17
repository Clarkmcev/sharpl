import { put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTrainingPlansRequest,
  fetchTrainingPlansSuccess,
  fetchTrainingPlansFailure,
  enrollInPlanRequest,
  enrollInPlanSuccess,
  enrollInPlanFailure,
  fetchMyEnrollmentsRequest,
  fetchMyEnrollmentsSuccess,
  fetchMyEnrollmentsFailure,
  unenrollFromPlanRequest,
  unenrollFromPlanSuccess,
  unenrollFromPlanFailure,
} from "../slices/trainingPlansSlice";
import { racePlansApi } from "../../api/client";

function* fetchTrainingPlansSaga() {
  try {
    const response: { data: any[] } = yield racePlansApi.getRacePlans();
    yield put(fetchTrainingPlansSuccess(response.data || []));
  } catch (error: any) {
    yield put(
      fetchTrainingPlansFailure(
        error.message || "Failed to fetch training plans",
      ),
    );
  }
}

function* enrollInPlanSaga(
  action: PayloadAction<{ planId: number; startDate: Date }>,
) {
  try {
    yield racePlansApi.enrollInRacePlan({
      planId: action.payload.planId,
      body: {
        startDate: action.payload.startDate,
      },
    });
    
    yield put(enrollInPlanSuccess());
    // Refresh enrollments after successful enrollment
    yield put(fetchMyEnrollmentsRequest());
  } catch (error: any) {
    const errorMsg =
      error?.response?.body?.error || "Failed to enroll in training plan";
    yield put(enrollInPlanFailure(errorMsg));
  }
}

function* fetchMyEnrollmentsSaga() {
  try {
    const response: { data: any[] } = yield racePlansApi.getMyEnrollments();
    yield put(fetchMyEnrollmentsSuccess(response.data || []));
  } catch (error: any) {
    yield put(
      fetchMyEnrollmentsFailure(
        error.message || "Failed to fetch enrollments",
      ),
    );
  }
}

function* unenrollFromPlanSaga(action: PayloadAction<number>) {
  try {
    yield racePlansApi.unenrollFromRacePlan({
      planId: action.payload,
    });
    
    yield put(unenrollFromPlanSuccess());
    // Refresh enrollments after successful unenrollment
    yield put(fetchMyEnrollmentsRequest());
  } catch (error: any) {
    const errorMsg =
      error?.response?.body?.error || "Failed to unenroll from training plan";
    yield put(unenrollFromPlanFailure(errorMsg));
  }
}

export default function* trainingPlansSaga() {
  yield takeLatest(fetchTrainingPlansRequest.type, fetchTrainingPlansSaga);
  yield takeLatest(enrollInPlanRequest.type, enrollInPlanSaga);
  yield takeLatest(fetchMyEnrollmentsRequest.type, fetchMyEnrollmentsSaga);
  yield takeLatest(unenrollFromPlanRequest.type, unenrollFromPlanSaga);
}
