const User = require("../models/User");
const Notification = require("../models/Notification");

const friendshipRequest = async (req, res) => {
  try {
    if (
      req.body.hasOwnProperty("response") ||
      req.body.hasOwnProperty("status")
    ) {
      throw new Error();
    }
    const newNotification = new Notification(req.body);
    if (newNotification.userId === newNotification.senderUserId) {
      return res.status(403).send("You can't be a friend with yourself.");
    }
    const user = await User.findById(newNotification.userId);
    if (user.friends.includes(newNotification.senderUserId)) {
      return res.status(400).send("User is already a friend.");
    }
    const requests = await Notification.find({
      senderUserId: newNotification.senderUserId,
      userId: newNotification.userId,
    });
    if (requests.filter((n) => n.status === false).length > 0) {
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
        response: true,
      });
      return res.status(409).send("You are already friends.");
    }
    const user = await User.findById(req.body.userId);
    await Notification.findByIdAndUpdate(req.body.notificationId, {
      status: true,
    });
    if (req.body.response === false) {
      return res.status(200).send("Request has been rejected successfully.");
    }
    await Notification.findByIdAndUpdate(req.body.notificationId, {
      status: true,
      response: true,
    });
    await currentUser.updateOne({ $push: { friends: req.body.userId } });
    await user.updateOne({ $push: { friends: req.body.currentUserId } });
    return res.status(200).send("Request has been accepted successfully.");
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

const getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const notifications = await Notification.find({ userId: user._id });
    const sortedNotifications = notifications
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      })
      .reverse();
    return res.status(200).json(sortedNotifications);
  } catch (error) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports.friendshipRequest = friendshipRequest;
module.exports.responseReqest = responseReqest;
module.exports.getNotifications = getNotifications;
