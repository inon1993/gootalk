const User = require("../models/User");
const Setting = require("../models/Setting");

const createSettings = async (req, res) => {
  const userSettings = new Setting(req.body);
  try {
    await userSettings.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json("Internal server error.");
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({ userId: req.params.id });
    const { theme } = settings;
    return res.status(200).send(theme);
  } catch (error) {
    return res.status(500).json("Internal server error.");
  }
};

const setTheme = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findById(req.params.id);
      await Setting.updateOne(
        { userId: req.params.id },
        { theme: req.body.theme }
      );
      return res.status(200).json("Theme updated successfully.");
    } catch (error) {
      return res.status(500).json("Internal server error.");
    }
  } else {
    return res.status(403).json("You can update your settings only.");
  }
};

module.exports.createSettings = createSettings;
module.exports.getSettings = getSettings;
module.exports.setTheme = setTheme;
