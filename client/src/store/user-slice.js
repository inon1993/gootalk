import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  firstname: "",
  lastname: "",
  email: "",
  profilePicture: "",
  coverPicture: "",
  followers: [],
  following: [],
  country: "",
  city: "",
  createdAt: null  
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, payload) {
      state.firstname = payload.username;
      state.lastname = payload.lastname;
      state.email = payload.email;
      state.profilePicture = payload.profilePicture;
      state.coverPicture = payload.coverPicture;
      state.followers = payload.followers;
      state.following = payload.following;
      state.country = payload.country;
      state.city = payload.city;
      state.createdAt = payload.createdAt;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
