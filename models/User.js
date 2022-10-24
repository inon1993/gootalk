const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
      validate: {
        validator: function (email) {
          const emailValidator =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return emailValidator.test(email);
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    notifications: {
      type: Array,
      default: [],
    },
    country: {
      type: String,
      maxlength: 20,
    },
    city: {
      type: String,
      maxlength: 20,
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
    { expiresIn: "10m" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  user.refreshTokens = user.refreshTokens.concat({ refreshToken });
  await user.save();
  return { accessToken, refreshToken };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
