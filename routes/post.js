const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const postCtr = require("../controllers/post-controllers");

//--CREATE NEW POST--//
router.post("/", auth, postCtr.newPostCtr);

//--UPDATE A POST--//
router.put("/:id", auth, postCtr.postUpdateCtr);

//--DELETE POST--//
router.delete("/:id", auth, postCtr.deletePostCtr);

//--LIKE/DISLIKE A POST--//
router.put("/:id/like", auth, postCtr.likePostCtr);

//--GET A POST--//
router.get("/:id", auth, postCtr.getPostCtr);

//--GET ALL USER POST--//
router.get("/posts/:userId", auth, postCtr.getAllUserPostsCtr);

//--GET POSTS TIMELINE--//
router.get("/timeline/:userId/:pageStart", auth, postCtr.getTimelineCtr);

//--UPLOAD IMAGE TO CLOUDINARY ANG GET URL--//
router.post("/uploadImg", auth, postCtr.uploadPicture);

//--GET POST LIKES--//
// router.get("/likes/:id", auth, postCtr.getLikes);

module.exports = router;
