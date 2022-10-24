const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const newComment = async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const commentUser = await User.findById(newComment.userId);
    const post = await Post.findById(newComment.postId);
    const postUser = await User.findById(post.userId);
    if ((!commentUser.friends.includes(postUser._id)) && (!commentUser._id.equals(postUser._id))) {
      return res.status(403).json("Only friends can add comments");
    }

    const savedComment = await newComment.save();
    const comments = await Comment.find({ postId: req.body.postId });
    const getCommentsUsers = await Promise.all(
      comments.map(async (c) => {
        return await User.findById(c.userId);
      })
    );
    res.status(200).send({
      comments: comments.reverse(),
      users: getCommentsUsers.reverse(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if (!comments) {
      return res.status(404).json("Post not found.");
    }
    const getCommentsUsers = await Promise.all(
      comments.map(async (c) => {
        return await User.findById(c.userId);
      })
    );
    return res.status(200).send({
      comments: comments.reverse(),
      users: getCommentsUsers.reverse(),
    });
  } catch (error) {
    return res.status(500).json("Internal server error.");
  }
};

const likeComment = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.userId !== req.body.userId) {
      if (!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { likes: req.body.userId } });
        comment = await Comment.findById(req.params.id);
        return res.status(200).send(comment.likes);
      } else {
        await comment.updateOne({ $pull: { likes: req.body.userId } });
        comment = await Comment.findById(req.params.id);
        return res.status(200).send(comment.likes);
      }
    } else {
      return res.status(403).json("You can't like your own comment.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getCommentLikes = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    return res.status(200).send(comment.likes);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.newComment = newComment;
module.exports.getComments = getComments;
module.exports.likeComment = likeComment;
module.exports.getCommentLikes = getCommentLikes;
