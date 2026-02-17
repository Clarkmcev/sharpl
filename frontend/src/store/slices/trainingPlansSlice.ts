import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RacePlan, MyEnrollmentsResponseDataInner } from "../../generated";

interface TrainingPlansState {
  plans: RacePlan[];
  selectedPlan: RacePlan | null;
  myEnrollments: MyEnrollmentsResponseDataInner[];
  loading: boolean;
  enrolling: boolean;
  loadingEnrollments: boolean;
  error: string | null;
  enrollmentSuccess: boolean;
}

const initialState: TrainingPlansState = {
  plans: [],
  selectedPlan: null,
  myEnrollments: [],
  loading: false,
  enrolling: false,
  loadingEnrollments: false,
  error: null,
  enrollmentSuccess: false,
};

const trainingPlansSlice = createSlice({
  name: "trainingPlans",
  initialState,
  reducers: {
    // Fetch training plans
    fetchTrainingPlansRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrainingPlansSuccess: (state, action: PayloadAction<RacePlan[]>) => {
      state.loading = false;
      state.plans = action.payload;
      state.error = null;
    },
    fetchTrainingPlansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Enroll in training plan
    enrollInPlanRequest: (
      state,
      action: PayloadAction<{ planId: number; startDate: Date }>,
    ) => {
      state.enrolling = true;
      state.error = null;
      state.enrollmentSuccess = false;
    },
    enrollInPlanSuccess: (state) => {
      state.enrolling = false;
      state.error = null;
      state.enrollmentSuccess = true;
      state.selectedPlan = null;
    },
    enrollInPlanFailure: (state, action: PayloadAction<string>) => {
      state.enrolling = false;
      state.error = action.payload;
      state.enrollmentSuccess = false;
    },

    // Select/deselect plan
    setSelectedPlan: (state, action: PayloadAction<RacePlan | null>) => {
      state.selectedPlan = action.payload;
    },

    // Reset enrollment state
    resetEnrollmentState: (state) => {
      state.enrollmentSuccess = false;
      state.error = null;
    },

    // Fetch my enrollments
    fetchMyEnrollmentsRequest: (state) => {
      state.loadingEnrollments = true;
      state.error = null;
    },
    fetchMyEnrollmentsSuccess: (
      state,
      action: PayloadAction<MyEnrollmentsResponseDataInner[]>,
    ) => {
      state.loadingEnrollments = false;
      state.myEnrollments = action.payload;
      state.error = null;
    },
    fetchMyEnrollmentsFailure: (state, action: PayloadAction<string>) => {
      state.loadingEnrollments = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTrainingPlansRequest,
  fetchTrainingPlansSuccess,
  fetchTrainingPlansFailure,
  enrollInPlanRequest,
  enrollInPlanSuccess,
  enrollInPlanFailure,
  setSelectedPlan,
  resetEnrollmentState,
  fetchMyEnrollmentsRequest,
  fetchMyEnrollmentsSuccess,
  fetchMyEnrollmentsFailure,
} = trainingPlansSlice.actions;

export default trainingPlansSlice.reducer;
