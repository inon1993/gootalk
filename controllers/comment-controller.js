const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const newComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({postId: req.params.postId})
    if(!comments) {
      return res.status(404).json("Post not found.");
    }
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).json("Internal server error.");
  }
}

module.exports.newComment = newComment;
module.exports.getComments = getComments;
