const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const bcrypt = require("bcrypt");
const Setting = require("../models/Setting");
const Comment = require("../models/Comment");

const updateUserCtr = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.updateRequired && req.body.updateRequired === "email") {
      try {
        const user = await User.findOne({ email: req.body.email });
        if (req.body.email === req.body.currentEmail) {
          return res.sendStatus(403);
        }
        if (user) {
          return res.sendStatus(409);
        }
      } catch (error) {
        return res.status(500).json(err);
      }
    }
    if (req.body.password) {
      const passwordValidator =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
      if (!passwordValidator.test(req.body.password)) {
        return res.status(403).json("Invalid password was provided.");
      }
      try {
        const salt = await bcrypt.genSalt(8);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const { currentEmail, ...other } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: other,
      });
      return res.status(200).json("Account has been updated successfully.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update your profile only.");
  }
};

const deleteUserCtr = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await Setting.deleteOne({ userId: req.params.id });
      await Post.deleteMany({ userId: req.params.id });
      await Notification.deleteMany({
        $or: [{ senderUserId: req.params.id }, { userId: req.params.id }],
      });
      await User.updateMany(
        {},
        {
          $pull: {
            notifications: {
              $or: [{ senderUserId: req.params.id }, { userId: req.params.id }],
            },
          },
        }
      );
      await User.updateMany({}, { $pull: { friends: req.params.id } });
      await Post.updateMany({}, { $pull: { likes: req.params.id } });
      await Comment.deleteMany({ userId: req.params.id });
      await Comment.updateMany({}, { $pull: { likes: req.params.id } });

      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted successfully.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete your profile only.");
  }
};

const getAllUsersCtr = async (req, res) => {
  try {
    const users = await User.find();
    const usersArr = users
      .map((user) => {
        const { password, updatedAt, ...other } = user._doc;
        return other;
      })
      .filter((user) => {
        return user._id != req.body.userId;
      });
    return res.status(200).json(usersArr);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUserCtr = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const followUserCtr = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        return res.status(200).json("User has been followed.");
      } else {
        return res.status(403).json("You already follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself.");
  }
};

const unfollowUserCtr = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        return res.status(200).json("User has been unfollowed.");
      } else {
        return res.status(403).json("You don't follow this user.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself.");
  }
};

const userStats = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friendsLen = user.friends.length;
    const posts = await Post.find({ userId: req.params.id });
    const postsLen = posts.length;
    const date = new Date(user.createdAt);

    return res.status(200).json({
      friends: friendsLen,
      posts: postsLen,
      createdAt: `${
        date.getMonth() + 1
      }.${date.getDate()}.${date.getFullYear()}`,
    });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

const getUserFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send(user.friends);
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports.updateUserCtr = updateUserCtr;
module.exports.deleteUserCtr = deleteUserCtr;
module.exports.getAllUsersCtr = getAllUsersCtr;
module.exports.getUserCtr = getUserCtr;
module.exports.followUserCtr = followUserCtr;
module.exports.unfollowUserCtr = unfollowUserCtr;
module.exports.userStats = userStats;
module.exports.getUserFriends = getUserFriends;
