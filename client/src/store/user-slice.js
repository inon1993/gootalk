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
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
      state.coverPicture = action.payload.coverPicture;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.country = action.payload.country;
      state.city = action.payload.city;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
