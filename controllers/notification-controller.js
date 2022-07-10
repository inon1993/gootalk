const User = require("../models/User");
const Notification = require("../models/Notification");

const friendshipRequest = async (req, res) => {
  console.log(1);
  console.log(req.body);
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
      ).length > 0
    ) {
      console.log(user.notifications);
      console.log(newNotification.senderUserId);
      return res.status(409).send("Request has already been sent.");
    }
    await newNotification.save();
    await user.updateOne({ $push: { notifications: newNotification } });
    return res.status(200).send("Request has been sent successfully.");
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

const responseReqest = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.currentUserId);
    if (currentUser.friends.includes(req.body.userId)) {
      await Notification.findByIdAndUpdate(req.body.notificationId, {
        status: true,
      });
      return res.status(409).send("You are already friends.");
    }
    const user = await User.findById(req.body.userId);
    await Notification.findByIdAndUpdate(req.body.notificationId, {
      status: true,
    });
    if (req.body.response === false) {
      return res.status(403).send("Request has been rejected successfully.");
    }
    await currentUser.updateOne({ $push: { friends: req.body.userId } });
    await user.updateOne({ $push: { friends: req.body.currentUserId } });
    return res.status(200).send("Request has been accepted successfully.");
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports.friendshipRequest = friendshipRequest;
module.exports.responseReqest = responseReqest;
