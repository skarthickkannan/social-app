const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/key");

const auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Not authorized",
    });
  }
  const verified = jwt.verify(token, config.TOKEN_SECRET);
  if (!verified) {
    res.status(400).json({
      success: false,
      message: "Verification failed",
    });
  }

  await User.findById(verified.id).then((userData) => {
    req.user = userData;
    next();
  });
};

module.exports = auth;
