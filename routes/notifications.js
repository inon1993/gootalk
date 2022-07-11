const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const notiCtr = require("../controllers/notification-controller");

//--CREATE NEW REQUEST--//
router
  .put("/", auth, notiCtr.friendshipRequest)
  .put("/response", auth, notiCtr.responseReqest)
  .get("/:userId", auth, notiCtr.getNotifications);

module.exports = router;
