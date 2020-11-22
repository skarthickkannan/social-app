const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const config = require("../config/key");

router.post("/register", async (req, res) => {
  let { username, email, password, repeatPassword } = req.body;

  if (!username || !email || !password || !repeatPassword) {
    res.status(400).send({
      success: false,
      message: "Please enter all credentials.",
    });
    if (password !== repeatPassword) {
      res.status(400).send({
        success: false,
        message: `Password doesn't match.`,
      });
    }
    if (password.length < 8) {
      res.status(400).send({
        success: false,
        message: "Password should have 8 characters",
      });
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      res.status(400).send({
        success: false,
        message: "Email is already taken",
      });
    }

    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      res.status(400).send({
        success: false,
        message: "Username is already taken",
      });
    }
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const register = await new User({
      username,
      email,
      password: hashPassword,
      repeatPassword: hashPassword,
    });
    const saveUser = await register.save();
    res.status(200).json({
      success: true,
      user: saveUser,
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please enter all credentials",
    });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({
      success: false,
      message: "No user with this email",
    });
  }
  if (user) {
    const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
      expiresIn: "48h",
    });
    res.status(200).json({
      success: true,
      token,
    });
  }
});

router.get("/current", auth, async (req, res) => {
  const user = req.user;
  res.status(200).json({
    id: user._id,
    username: user.username,
  });
});

module.exports = router;
