import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../generated";

interface UsersState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  total: 0,
};

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Fetch all users actions
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (
      state,
      action: PayloadAction<{ users?: User[]; total?: number }>
    ) => {
      state.loading = false;
      state.users = action.payload.users || [];
      state.total = action.payload.total || 0;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch user by ID actions
    fetchUserByIdRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserByIdSuccess: (state, action: PayloadAction<{ user?: User }>) => {
      state.loading = false;
      state.currentUser = action.payload.user || null;
    },
    fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Other actions
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdRequest,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  clearError,
  clearCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;
