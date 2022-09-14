const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
      default: "light",
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", SettingsSchema);

module.exports = Setting;
