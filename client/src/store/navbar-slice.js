import { createSlice } from "@reduxjs/toolkit";

const initialNavbarState = {
  activate: {
    home: true,
    notifications: false,
    profile: false,
  },
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState: initialNavbarState,
  reducers: {
    activateHome(state) {
      state.activate.home = true;
      state.activate.notifications = false;
      state.activate.profile = false;
    },
    activateNotification(state) {
        state.activate.home = false;
        state.activate.notifications = true;
        state.activate.profile = false;
    },
    activateProfile(state) {
        state.activate.home = false;
        state.activate.notifications = false;
        state.activate.profile = true;
    },
    deactivate(state) {
        state.activate.home = false;
        state.activate.notifications = false;
        state.activate.profile = false;
    },
  },
});

export const navbarActions = navbarSlice.actions;

export default navbarSlice.reducer;
