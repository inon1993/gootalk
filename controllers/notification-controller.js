const User = require("../models/User");
const Notification = require("../models/Notification");

const friendshipRequest = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    if (newNotification.userId === newNotification.senderUserId) {
      return res.status(403).send("You can't be a friend with yourself.");
    }
    const user = await User.findById(newNotification.userId);
    if (user.friends.includes(newNotification.senderUserId)) {
      return res.status(400).send("User is already a friend.");
    }
    if (
      user.notifications.filter(
        (n) => n.senderUserId === newNotification.senderUserId
      )
    ) {
      return res.status(409).send("Request has already been sent.");
    }
    await newNotification.save();
    await user.updateOne({ $push: { notifications: newNotification } });
    return res.status(200).send("Request has been sent successfully.");
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

const acceptReqest = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.currentUserId);
    if (user.friends.includes(req.body.userId)) {
      return res.status(409).send("You are already friends.");
    }
    const user = await User.findById(req.body.userId);
    const notification = await Notification.findByIdAndUpdate(req.body.notificationId, {status: true})
    if(!notification) {
        throw new Error()
    }
    await currentUser.updateOne({ $push: { friends: req.body.userId } });
    // await currentUser.updateOne({ notifications: { friends: req.body.userId } });
    await user.updateOne({ $push: { friends: req.body.currentUserId } });
    // await user.updateOne({ $push: { friends: req.body.currentUserId } });
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports.friendshipRequest = friendshipRequest;
