const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  config: {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
  },
  auth: {
    email: {
      type: String,
      required: true,
    },
    local: {
      password: {
        type: String,
      },
    },
    google: {
      id: {
        type: String,
      },
    },
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;