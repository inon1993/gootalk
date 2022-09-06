const bcrypt = require("bcrypt");
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");

const registerCtr = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.data.password, salt);

    const newUser = new User({
      firstname: req.body.data.firstname,
      lastname: req.body.data.lastname,
      email: req.body.data.email,
      password: hashedPassword,
      country: req.body.data.country,
      city: req.body.data.city,
      profilePicture: req.body.profilePicture?.data?.url || "",
    });

    const user = await newUser.save();
    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send("e-mail is already registered.");
    }
    return res.status(500).json(err);
  }
};

const loginCtr = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password.");
    }

    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });

    // return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const uploadPicture = async (req, res) => {
  try {
    const page = req.body.page;
    let imgSize = 0;
    if (page === "profile-picture") {
      imgSize = 208;
    } else if (page === "cover-picture") {
      imgSize = 600;
    } else if (page === "post") {
      imgSize = 800;
    }
    const fileStr = req.body.profilePicture;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      width: imgSize,
      crop: "scale",
    });
    const url = uploadedResponse.url;
    return res.status(200).json({ url: url });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports.registerCtr = registerCtr;
module.exports.loginCtr = loginCtr;
module.exports.uploadPicture = uploadPicture;
