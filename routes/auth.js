const router = require("express").Router();
const authCtr = require("../controllers/auth-controllers");
const auth = require("../middleware/auth-mid");

router
  .post("/register", authCtr.registerCtr)
  .post("/login", authCtr.loginCtr)
  .post("/upload", authCtr.uploadPicture)
  .post("/reauth/:id", auth, authCtr.reauth)

module.exports = router;
