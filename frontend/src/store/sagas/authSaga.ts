import { put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginRequest, RegisterRequest } from "../../generated";
import {
  loginRequest,
  loginSuccess,
  logoutSuccess,
  loginFailure,
  registerRequest,
  registerFailure,
  registerSuccess,
  logoutRequest,
  whoamiRequest,
  whoamiSuccess,
  whoamiFailure,
} from "../slices/authSlice";
import { authApi } from "../../api/client";

// Worker saga: will be fired on LOGIN_REQUEST actions
function* loginSaga(action: PayloadAction<LoginRequest>) {
  try {
    const { email, password } = action.payload;

    // Call API
    const response = yield authApi.login({ body: { email, password } });

    if (response.error) {
      console.log("Error :", response.error);
      yield put(loginFailure("Oops this didn't work."));
    } else if (response) {
      // Success - dispatch success action
      yield put(
        loginSuccess({
          user: response.user,
          token: response.token,
          message: response.message,
        }),
      );
    } else {
      yield put(loginFailure("No data received"));
    }
  } catch (error) {
    // Error - dispatch failure action
    console.log(error);
    yield put(loginFailure("Network error. Please try again."));
  }
}

// Worker saga: will be fired on REGISTER_REQUEST actions
function* registerSaga(action: PayloadAction<RegisterRequest>) {
  try {
    const { email, password, name } = action.payload;
    const response = yield authApi.register({
      body: { email, password, name },
    });

    if (response.error) {
      yield put(registerFailure(response.error.error || "Registration failed"));
    } else {
      yield put(registerSuccess());
    }
  } catch (error) {
    console.log(error);
    yield put(registerFailure("Network error. Please try again."));
  }
}

// Worker saga: will be fired on LOGOUT_REQUEST actions
function* logoutSaga() {
  try {
    yield authApi.logout();
    localStorage.removeItem("authToken");
    yield put(logoutSuccess());
  } catch (error) {
    // Even if API call fails, clear local state
    console.log(error);
    localStorage.removeItem("authToken");
    yield put(logoutSuccess());
  }
}

function* whoamiSaga() {
  try {
    console.log("whoamiSaga called");
    const user = yield authApi.whoami();
    yield put(whoamiSuccess(user));
  } catch (error) {
    console.log(error);
    yield put(whoamiFailure("Failed to fetch user information"));
    // Clear auth state on whoami failure (invalid/expired token)
    localStorage.removeItem("authToken");
  }
}

// Watcher saga: spawns a new loginSaga on each LOGIN_REQUEST action
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(whoamiRequest.type, whoamiSaga);
}
