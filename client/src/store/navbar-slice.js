import { createSlice } from "@reduxjs/toolkit";

const initialNavbarState = {
  activate: {
    home: false,
    notifications: false,
    profile: false,
    search: false,
    searchInput: true,
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
      state.activate.searchInput = true;
    },
    activateNotification(state) {
      state.activate.home = false;
      state.activate.notifications = true;
      state.activate.profile = false;
      state.activate.search = false;
      state.activate.searchInput = true;
    },
    activateProfile(state) {
      state.activate.home = state.activate.home;
      state.activate.notifications = state.activate.notifications;
      state.activate.profile = !state.activate.profile;
      state.activate.search = false;
      state.activate.searchInput = state.activate.searchInput;
    },
    activateSearch(state) {
      state.activate.home = false;
      state.activate.notifications = false;
      state.activate.profile = false;
      state.activate.search = true;
      state.activate.searchInput = false;
    },
    deactivateSearchInput(state) {
      state.activate.home = state.activate.home;
      state.activate.notifications = state.activate.notifications;
      state.activate.profile = state.activate.profile;
      state.activate.search = state.activate.search;
      state.activate.searchInput = false;
    },
    activateSearchInput(state) {
      state.activate.home = state.activate.home;
      state.activate.notifications = state.activate.notifications;
      state.activate.profile = state.activate.profile;
      state.activate.search = state.activate.search;
      state.activate.searchInput = true;
    },
    deactivate(state) {
      state.activate.home = false;
      state.activate.notifications = false;
      state.activate.profile = false;
      state.activate.search = false;
      state.activate.searchInput = state.activate.searchInput;
    },
  },
});

export const navbarActions = navbarSlice.actions;

export default navbarSlice.reducer;
