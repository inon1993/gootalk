const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const authCtr = require("../controllers/auth-controllers");

//--REGISTER--//
router.post("/register", authCtr.registerCtr);

//--LOGIN--//
router.post("/login", authCtr.loginCtr);

module.exports = router;
