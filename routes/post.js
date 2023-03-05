const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const postCtr = require("../controllers/post-controllers");

//--CREATE NEW POST--//
router
  .post("/", auth, postCtr.newPostCtr)

  //--UPDATE A POST--//
  .put("/:id", auth, postCtr.postUpdateCtr)

  //--DELETE POST--//
  .delete("/:id/:userId", auth, postCtr.deletePostCtr)

  //--LIKE/DISLIKE A POST--//
  .put("/:id/like", auth, postCtr.likePostCtr)

  //--GET A POST--//
  .get("/:id", auth, postCtr.getPostCtr)

  //--GET ALL USER POST--//
  .get("/posts/:userId", auth, postCtr.getAllUserPostsCtr)

  //--GET POSTS TIMELINE--//
  .get("/timeline/:userId/:pageStart", auth, postCtr.getTimelineCtr)

  //--UPLOAD IMAGE TO CLOUDINARY ANG GET URL--//
  .post("/uploadImg", auth, postCtr.uploadPicture);

module.exports = router;
