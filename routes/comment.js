const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const commentCtr = require("../controllers/comment-controller");

//--CREATE NEW COMMENT--//
router.post("/", auth, commentCtr.newComment);

//--GET COMMENTS--//
router.get("/:postId", auth, commentCtr.getComments);

//--LIKE/DISLIKE A COMMENT--//
router.put("/:id/like", auth, commentCtr.likeComment);

//--GET COMMENT LIKES--//
router.get("/likes/:id", auth, commentCtr.getCommentLikes);

//--DELETE COMMENT--//
// router.delete("/:id", auth, commentCtr.deleteComment);

module.exports = router;
