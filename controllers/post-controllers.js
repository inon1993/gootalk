const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const { cloudinary } = require("../utils/cloudinary");

const newPostCtr = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postUpdateCtr = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      if (
        (req.body.desc === "" && req.body.image === "") ||
        (req.body.desc === "" && post.image === "" && !req.body.image)
      ) {
        return res.status(403).json("A post can not be empty.");
      }
      await post.updateOne({ $set: req.body });
      const updatedPost = await Post.findById(req.params.id);
      return res
        .status(200)
        .json({ msg: "Post has been updated.", data: updatedPost });
    } else {
      return res.status(403).json("You can only update your posts.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deletePostCtr = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.createdAt < new Date(2023, 1, 1)) {
      return res.status(403).json("This post is undeleteable.");
    }
    if (post.userId === req.params.userId) {
      await post.deleteOne();
      await Comment.deleteMany({
        postId: req.params.id,
      });
      return res.status(200).json("Post has been deleted.");
    } else {
      return res.status(403).json("You can only delete your posts.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const likePostCtr = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        post = await Post.findById(req.params.id);
        return res.status(200).send(post.likes);
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        post = await Post.findById(req.params.id);
        return res.status(200).send(post.likes);
      }
    } else {
      return res.status(403).json("You can't like your own posts.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getPostCtr = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getAllUserPostsCtr = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: user._id });
    return res.status(200).json(userPosts.reverse());
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getTimelineCtr = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const posts = await Post.find({
      $or: [{ userId: user._id }, { userId: { $in: user.friends } }],
    })
      .sort({ createdAt: -1 })
      .skip(req.params.pageStart)
      .limit(5);
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const uploadPicture = async (req, res) => {
  try {
    const fileStr = req.body.image;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      height: 500,
      crop: "scale",
    });
    const url = uploadedResponse.url;
    return res.status(200).json({ url: url });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports.newPostCtr = newPostCtr;
module.exports.postUpdateCtr = postUpdateCtr;
module.exports.deletePostCtr = deletePostCtr;
module.exports.likePostCtr = likePostCtr;
module.exports.getPostCtr = getPostCtr;
module.exports.getAllUserPostsCtr = getAllUserPostsCtr;
module.exports.getTimelineCtr = getTimelineCtr;
module.exports.uploadPicture = uploadPicture;
