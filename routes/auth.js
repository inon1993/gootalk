const router = require("express").Router();
const authCtr = require("../controllers/auth-controllers");

router
  .post("/register", authCtr.registerCtr)
  .post("/login", authCtr.loginCtr)
  .post("/upload", authCtr.uploadPicture);

module.exports = router;
