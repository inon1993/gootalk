import { createSlice } from "@reduxjs/toolkit";

const initialDropdownState = {
  activate: false,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: initialDropdownState,
  reducers: {
    activate(state) {
      state.activate = !state.activate;
    },
    deactivate(state) {
      state.activate = false;
    },
  },
});

export const dropdownActions = dropdownSlice.actions;

export default dropdownSlice.reducer;
