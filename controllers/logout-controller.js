const { cookie } = require("express/lib/response");
const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt || cookies.jwt === "" || cookies.jwt === null || cookies.jwt === undefined) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({
      "refreshTokens.refreshToken": refreshToken,
    });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(204).send("Cookie deleted successfully.");
    }

    await user.updateOne({
      $pull: { refreshTokens: { refreshToken: refreshToken } },
    });

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(204).send("Cookie deleted successfully.");
  } catch (e) {
    return res.status(204).send("Please authenticate.");
  }
};

module.exports = handleLogout;
