const bcrypt = require("bcrypt");
const User = require("../models/User");
const { cloudinary } = require("../utils/cloudinary");

const registerCtr = async (req, res) => {
  const passwordValidator =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;

  try {
    if (!passwordValidator.test(req.body.data.password)) {
      return res.status(403).json("Invalid password was provided.");
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(req.body.data.password, salt);

    const newUser = new User({
      firstname: req.body.data.firstname,
      lastname: req.body.data.lastname,
      email: req.body.data.email,
      password: hashedPassword,
      country: req.body.data.country,
      city: req.body.data.city,
      profilePicture: req.body.profilePicture || "",
    });

    const user = await newUser.save();
    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const { password, ...data } = user._doc;
    res.status(200).json({ data, accessToken });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send("e-mail is already registered.");
    }
    return res.status(500).json(err);
  }
};

const loginCtr = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found.");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password.");
    }

    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const { password, ...data } = user._doc;
    res.status(200).json({ data, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const reauth = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(403).json("Wrong password.");
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const uploadPicture = async (req, res) => {
  try {
    const page = req.body.page;
    let imgSize = 0;
    if (page === "profile-picture") {
      imgSize = 208;
    } else if (page === "cover-picture") {
      imgSize = 600;
    } else if (page === "post") {
      if (req.body.profilePicture.type === "image") {
        imgSize = 800;
      } else {
        imgSize = 300;
      }
    }
    const fileStr = req.body.profilePicture.file;
    if (req.body.profilePicture.type === "image") {
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        width: imgSize,
        crop: "scale",
      });
      const url = uploadedResponse.url;
      return res.status(200).json({ url: url });
    }
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: "video",
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
    });
    const url = uploadedResponse.url;
    return res.status(200).json({ url: url });
  } catch (error) {
    return res.sendStatus(500);
  }
};

const demoLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: process.env.DEMO_EMAIL });
    if (!user) {
      return res.status(404).json("User not found.");
    }

    const validPassword = await bcrypt.compare(
      process.env.DEMO_PASSWORD,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Wrong password.");
    }

    const tokens = await user.generateAuthToken();
    const accessToken = tokens.accessToken;
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const { password, ...data } = user._doc;
    res.status(200).json({ data, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.registerCtr = registerCtr;
module.exports.loginCtr = loginCtr;
module.exports.reauth = reauth;
module.exports.uploadPicture = uploadPicture;
module.exports.demoLogin = demoLogin;
