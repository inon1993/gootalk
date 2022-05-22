import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
  activate: {
    home: false,
    profile: false,
    friends: false,
    settings: false,
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialMenuState,
  reducers: {
    activateHome(state) {
      state.activate.home = true;
      state.activate.profile = false;
      state.activate.friends = false;
      state.activate.settings = false;
    },
    activateProfile(state) {
        state.activate.home = false;
        state.activate.profile = true;
        state.activate.friends = false;
        state.activate.settings = false;
    },
    activateFriends(state) {
        state.activate.home = false;
        state.activate.profile = false;
        state.activate.friends = true;
        state.activate.settings = false;
    },
    activateSettings(state) {
        state.activate.home = false;
        state.activate.profile = false;
        state.activate.friends = false;
        state.activate.settings = true;
    },
    deactivate(state) {
        state.activate.home = false;
        state.activate.profile = false;
        state.activate.friends = false;
        state.activate.settings = false;
    },
  },
});

export const menuActions = menuSlice.actions;

export default menuSlice.reducer;
