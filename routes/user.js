const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//--UPDATE USER--//
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(8);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            return res.status(200).json("Account has been updated successfully.");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update your profile only.")
    }
});

//--DELETE USER--//
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted successfully.");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete your profile only.")
    }
});

//--GET A USER--//
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//--FOLLOW A USER--//
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}});
                return res.status(200).json("User has been followed.")
            } else {
                return res.status(403).json("You already follow this user.")
            }
        } catch (err) {
            
        }
    } else {
        return res.status(403).json("You can't follow yourself.")
    }
});
 //--UNFOLLOW A USER--//
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.params.id}});
                return res.status(200).json("User has been unfollowed.")
            } else {
                return res.status(403).json("You don't follow this user.")
            }
        } catch (err) {
            
        }
    } else {
        return res.status(403).json("You can't unfollow yourself.")
    }
});

module.exports = router;