import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: {
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
    coverPicture: "",
    friends: [],
    country: "",
    city: "",
    notifications: [],
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
      state.user.country = action.payload.country;
      state.user.city = action.payload.city;
    },
    setNotifications(state, action) {
      state.user.notifications = action.payload.notifications;
    },
    setFriends(state, action) {
      state.user.friends = action.payload.friends;
    },
    logoutUser(state) {
      state.user.userId = "";
      state.user.firstname = "";
      state.user.lastname = "";
      state.user.email = "";
      state.user.profilePicture = "";
      state.user.coverPicture = "";
      state.user.friends = [];
      state.user.country = "";
      state.user.city = "";
      state.user.notifications = [];
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
