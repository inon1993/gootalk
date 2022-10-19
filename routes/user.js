const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const userCtr = require("../controllers/user-controllers");

//--UPDATE USER--//
router.put("/:id", auth, userCtr.updateUserCtr)

//--DELETE USER--//
    .delete("/:id", auth, userCtr.deleteUserCtr)

//--GET ALL USERS--//
    .get("/", auth, userCtr.getAllUsersCtr)

//--GET A USER--//
    .get("/:id", userCtr.getUserCtr)

//--FOLLOW A USER--//
    .put("/:id/follow", auth, userCtr.followUserCtr)

//--UNFOLLOW A USER--//
    .put("/:id/unfollow", auth, userCtr.unfollowUserCtr)

//--GET USER PROFILE STATISTICS--//
    .get("/stats/:id", auth, userCtr.userStats)

//--GET USER FRIENDS--//
    .get("/friends/:id", auth, userCtr.getUserFriends);

module.exports = router;
