import { createSlice } from "@reduxjs/toolkit";

const initialNavbarState = {
  activate: {
    home: false,
    notifications: false,
    profile: false,
    search: false,
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
      state.activate.search = false;
    },
    activateNotification(state) {
      state.activate.home = false;
      state.activate.notifications = true;
      state.activate.profile = false;
      state.activate.search = false;
    },
    activateProfile(state) {
      state.activate.home = state.activate.home;
      state.activate.notifications = state.activate.notifications;
      state.activate.profile = !state.activate.profile;
      state.activate.search = false;
    },
    activateSearch(state) {
      state.activate.home = false;
      state.activate.notifications = false;
      state.activate.profile = false;
      state.activate.search = true;
    },
    deactivate(state) {
      state.activate.home = false;
      state.activate.notifications = false;
      state.activate.profile = false;
      state.activate.search = false;
    },
  },
});

export const navbarActions = navbarSlice.actions;

export default navbarSlice.reducer;
