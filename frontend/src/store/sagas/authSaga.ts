import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { auth as authApi } from "../../api/client";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
} from "../slices/authSlice";

// Worker saga: will be fired on LOGIN_REQUEST actions
function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
) {
  try {
    const { email, password } = action.payload;

    // Call API
    const response: Awaited<ReturnType<typeof authApi.login>> = yield call(
      authApi.login,
      email,
      password
    );

    if (response.error) {
      console.log(response.error);
      yield put(loginFailure("Oops this didn't work."));
    } else if (response.data) {
      // Success - dispatch success action
      yield put(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
          message: response.data.message,
        })
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
function* registerSaga(
  action: PayloadAction<{ email: string; password: string; name?: string }>
) {
  try {
    const { email, password, name } = action.payload;

    const response: Awaited<ReturnType<typeof authApi.register>> = yield call(
      authApi.register,
      email,
      password,
      name
    );

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
    yield call(authApi.logout);
    localStorage.removeItem("authToken");
    yield put(logoutSuccess());
  } catch (error) {
    // Even if API call fails, clear local state
    console.log(error);
    localStorage.removeItem("authToken");
    yield put(logoutSuccess());
  }
}

// Watcher saga: spawns a new loginSaga on each LOGIN_REQUEST action
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}
