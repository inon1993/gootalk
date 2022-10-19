const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const commentCtr = require("../controllers/comment-controller");

//--CREATE NEW COMMENT--//
router.post("/", auth, commentCtr.newComment)

//--GET COMMENTS--//
    .get("/:postId", auth, commentCtr.getComments)

//--LIKE/DISLIKE A COMMENT--//
    .put("/:id/like", auth, commentCtr.likeComment)

//--GET COMMENT LIKES--//
    .get("/likes/:id", auth, commentCtr.getCommentLikes);

module.exports = router;
