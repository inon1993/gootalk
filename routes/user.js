const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth-mid");

//--UPDATE USER--//
router.put("/:id", auth, async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(8);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("Account has been updated successfully.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update your profile only.");
  }
});

//--DELETE USER--//
router.delete("/:id", auth, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("Account has been deleted successfully.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete your profile only.");
  }
});

//--GET ALL USERS--//
router.get("/", auth, async (req, res) => {
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
});

//--GET A USER--//
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//--FOLLOW A USER--//
router.put("/:id/follow", auth, async (req, res) => {
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
});
//--UNFOLLOW A USER--//
router.put("/:id/unfollow", auth, async (req, res) => {
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
});

module.exports = router;
