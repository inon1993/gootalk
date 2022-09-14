import { createSlice } from "@reduxjs/toolkit";

const initialSettingsState = {
  toggle: {
    theme: "light",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    setSettings(state, action) {
      state.toggle.theme = action.payload.theme;
    },
    themeToggle(state) {
      state.toggle.theme = state.toggle.theme === "light" ? "dark" : "light";
    },
    themeReset(state) {
      state.toggle.theme = "light";
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
