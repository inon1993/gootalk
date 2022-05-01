const mongoose = require("mongoose");
const { userInfo } = require("os");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
