const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//--REGISTER--//
router.post("/register", async (req, res) => {
  // const date = new Date();
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
      // createdAt: date,
    });

    const user = await newUser.save();
    const token = await user.generateAuthToken();
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//--LOGIN--//
router.post("/login", async (req, res) => {
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

    const token = await user.generateAuthToken();

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
