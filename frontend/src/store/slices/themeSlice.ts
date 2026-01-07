import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ThemeColor = 
  | "purple" 
  | "blue" 
  | "green" 
  | "orange" 
  | "pink" 
  | "indigo"
  | "red"
  | "teal";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  color: ThemeColor;
  mode: ThemeMode;
}

const loadTheme = (): ThemeState => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore errors
  }
  return { color: "purple", mode: "light" };
};

const saveTheme = (theme: ThemeState) => {
  localStorage.setItem("theme", JSON.stringify(theme));
};

const initialState: ThemeState = loadTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColor: (state, action: PayloadAction<ThemeColor>) => {
      state.color = action.payload;
      saveTheme(state);
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      saveTheme(state);
    },
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      state.color = action.payload.color;
      state.mode = action.payload.mode;
      saveTheme(state);
    },
  },
});

export const { setThemeColor, setThemeMode, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
