const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = require("mongoose");
const Design = require('./Design.js');
const Float = require('mongoose-float').loadType(mongoose,2);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cart: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Design',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Float,
      required: true,
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designer',
      required: true,
    }
  }],
  config: {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
    role: {
      type: String,
      enum: ['Customer', 'Designer', 'Admin'],
      default: 'Customer'
    }
  },
  auth: {
    username: {
      type: String,
      required: true
    },
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

userSchema.methods.isValidPassword = async function (password) {
  // this points to User model
  try {
      return await bcrypt.compare(password, this.auth.local.password);
  } catch(err) {
      throw new Error(err);
  }
}

const User = mongoose.model('user', userSchema);

module.exports = User;