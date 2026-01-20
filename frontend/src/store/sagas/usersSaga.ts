import { put, takeLatest } from "redux-saga/effects";
// import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  // fetchUserByIdRequest,
  // fetchUserByIdSuccess,
  // fetchUserByIdFailure,
} from "../slices/usersSlice";
import { usersApi } from "../../api/client";

// Worker saga: fetch all users
function* fetchUsersSaga() {
  try {
    const response = yield usersApi.getUsers();

    if (response.error) {
      yield put(fetchUsersFailure("Failed to fetch users"));
    } else if (response.data) {
      yield put(
        fetchUsersSuccess({
          users: response.data.users,
          total: response.data.total,
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(fetchUsersFailure("Network error. Please try again."));
  }
}

// Worker saga: fetch user by ID
// function* fetchUserByIdSaga(action: PayloadAction<number>) {
//   try {
//     const id = action.payload;
//     const response: Awaited<ReturnType<typeof usersApi.getById>> = yield call(
//       usersApi.getById,
//       id,
//     );

//     if (response.error) {
//       yield put(fetchUserByIdFailure("User not found"));
//     } else if (response.data) {
//       yield put(
//         fetchUserByIdSuccess({
//           user: response.data.user,
//         }),
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     yield put(fetchUserByIdFailure("Network error. Please try again."));
//   }
// }

// Watcher saga
export default function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  // yield takeLatest(fetchUserByIdRequest.type, fetchUserByIdSaga);
}
