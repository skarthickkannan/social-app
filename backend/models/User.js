const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  repeatPassword: {
    type: String,
    required: true,
    min: 8,
  },
});

module.exports = mongoose.model("User", User);
