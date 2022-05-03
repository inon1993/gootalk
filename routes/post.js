const Post = require("../models/Post");
const User = require("../models/Post");
const router = require("express").Router();

//--CREATE NEW POST--//
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    console.log("fdsfsd");
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//--UPDATE A POST--//
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            return res.status(200).json("Post has benn updated.");
        } else {
            return res.status(403). json("You can only update your posts.")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//--DELETE POST--//
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("Post has benn deleted.");
        } else {
            return res.status(403). json("You can only delete your posts.")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//--LIKE A POST--//
//--GET A POST--//
//--GET POSTS TIMELINE--//

module.exports = router;