const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { cookie } = require("express/lib/response");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const user = await User.findOne({
      "refreshTokens.refreshToken": refreshToken,
    });

    if (!user) {
      throw new Error();
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded || decoded._id !== user._id.toString()) {
      return res.status(403).json("Forrbiden");
    }

    const accessToken = jwt.sign(
      { _id: user._id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({ accessToken });
  } catch (e) {
    return res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = handleRefreshToken;
