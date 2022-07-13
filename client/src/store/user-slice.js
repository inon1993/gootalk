import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: {
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    // followers: [],
    // following: [],
    country: "",
    city: "",
    notifications: [],
    // accessToken: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.user.userId = action.payload.userId;
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.email = action.payload.email;
      state.user.profilePicture = action.payload.profilePicture;
      state.user.coverPicture = action.payload.coverPicture;
      // state.user.followers = action.payload.followers;
      // state.user.following = action.payload.following;
      state.user.country = action.payload.country;
      state.user.city = action.payload.city;
      // state.user.notifications = action.payload.notifications;
      // state.user.accessToken = action.payload.accessToken;
    },
    setNotifications(state, action) {
      state.user.notifications = action.payload.notifications;
    },
    logoutUser(state) {
      state.user.userId = "";
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.email = "";
      state.user.profilePicture = "";
      state.user.coverPicture = "";
      // state.user.followers = [];
      // state.user.following = [];
      state.user.country = "";
      state.user.city = "";
      state.user.notifications = [];
      // state.user.accessToken = "";
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
