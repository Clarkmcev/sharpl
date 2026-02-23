import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type StatusType = "success" | "error" | null;

interface StatusState {
  type: StatusType;
  message: string | null;
}

const initialState: StatusState = {
  type: null,
  message: null,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    showSuccess: (state, action: PayloadAction<string>) => {
      state.type = "success";
      state.message = action.payload;
    },
    showError: (state, action: PayloadAction<string>) => {
      state.type = "error";
      state.message = action.payload;
    },
    clearStatus: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { showSuccess, showError, clearStatus } = statusSlice.actions;
export default statusSlice.reducer;
