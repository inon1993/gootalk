const router = require("express").Router();
const auth = require("../middleware/auth-mid");
const commentCtr = require("../controllers/comment-controller");

//--CREATE NEW COMMENT--//
router.post("/", auth, commentCtr.newComment);

//--DELETE COMMENT--//
// router.delete("/:id", auth, commentCtr.deleteComment);

module.exports = router;
