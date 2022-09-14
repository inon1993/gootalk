import { createSlice } from "@reduxjs/toolkit";

const initialSettingsState = {
  toggle: {
    theme: "light"
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    themeToggle(state) {
      state.toggle.theme = state.toggle.theme === "light" ? "dark" : "light";
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
