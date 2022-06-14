import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: {
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: [],
    country: "",
    city: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.user.userId = action.payload.userId;
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.email = action.payload.email;
      state.user.profilePicture = action.payload.profilePicture;
      state.user.coverPicture = action.payload.coverPicture;
      state.user.followers = action.payload.followers;
      state.user.following = action.payload.following;
      state.user.country = action.payload.country;
      state.user.city = action.payload.city;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
