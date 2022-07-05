const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const userCtr = require("../controllers/user-controllers");

//--UPDATE USER--//
router.put("/:id", auth, userCtr.updateUserCtr);

//--DELETE USER--//
router.delete("/:id", auth, userCtr.deleteUserCtr);

//--GET ALL USERS--//
router.get("/", auth, userCtr.getAllUsersCtr);

//--GET A USER--//
router.get("/:id", userCtr.getUserCtr);

//--FOLLOW A USER--//
router.put("/:id/follow", auth, userCtr.followUserCtr);

//--UNFOLLOW A USER--//
router.put("/:id/unfollow", auth, userCtr.unfollowUserCtr);

module.exports = router;
