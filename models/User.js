const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    following: {
      type: Array,
      default: [],
    },
    country: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    refreshTokens: [
      {
        refreshToken: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "20s" }
  );
  user.refreshTokens = user.refreshTokens.concat({ refreshToken });
  await user.save();
  return { accessToken, refreshToken };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
