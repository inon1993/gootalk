const { Module } = require("module");
const { userInfo } = require("os");
const User = require("../models/User");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
  res.send("ok");
});

module.exports = router;
