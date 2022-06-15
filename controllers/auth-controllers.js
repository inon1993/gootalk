const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerCtr = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      country: req.body.country,
      city: req.body.city,
      profilePicture: req.body.profilePicture,
    });

    const user = await newUser.save();
    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });
  } catch (err) {
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
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, accessToken });

    // return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.registerCtr = registerCtr;
module.exports.loginCtr = loginCtr;
