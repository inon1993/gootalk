const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const newComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.newComment = newComment;
