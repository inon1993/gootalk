const router = require("express").Router();
const authCtr = require("../controllers/auth-controllers");
const auth = require("../middleware/auth-mid");

//--REGISTER NEW USER--//
router
  .post("/register", authCtr.registerCtr)

  //--LOGIN USER--//
  .post("/login", authCtr.loginCtr)

  //--UPLOAD PROFILE PICTURE--//
  .post("/upload", authCtr.uploadPicture)

  //--REAUTHENTICATE FOR SETTINGS--//
  .post("/reauth/:id", auth, authCtr.reauth)

  //--LOGIN DEMO USER--//
  .post("/login/demo", authCtr.demoLogin);

module.exports = router;
