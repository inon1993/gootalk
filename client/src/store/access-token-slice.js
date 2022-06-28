import { createSlice } from "@reduxjs/toolkit";

const initialAccessTokenState = {
  accessToken: null,
};

const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState: initialAccessTokenState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    removeAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const accessTokenActions = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
