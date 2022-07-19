const Post = require("../models/Post");
const User = require("../models/User");

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
      await post.updateOne({ $set: req.body });
      return res.status(200).json("Post has been updated.");
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
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json("Post has benn deleted.");
    } else {
      return res.status(403).json("You can only delete your posts.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const likePostCtr = async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        return res.status(200).json("Post has been liked.");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        return res.status(200).json("Post has been disliked.");
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
    console.log(user);
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
    if (posts.length < 5) {
      console.log(123);
      console.log(posts);
      return res.status(204).send(posts);
    }
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.newPostCtr = newPostCtr;
module.exports.postUpdateCtr = postUpdateCtr;
module.exports.deletePostCtr = deletePostCtr;
module.exports.likePostCtr = likePostCtr;
module.exports.getPostCtr = getPostCtr;
module.exports.getAllUserPostsCtr = getAllUserPostsCtr;
module.exports.getTimelineCtr = getTimelineCtr;
