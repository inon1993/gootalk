const router = require("express").Router();
const authCtr = require("../controllers/auth-controllers");

router
  .post("/register", authCtr.registerCtr)
  .post("/login", authCtr.loginCtr);

module.exports = router;