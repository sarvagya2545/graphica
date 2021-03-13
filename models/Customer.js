const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { Schema } = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'Design',
  }],
  description: {
    type: String,
  },
  config: {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      required: true,
    },
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

customerSchema.methods.isValidPassword = async function (password) {
  // this points to User model
  try {
      return await bcrypt.compare(password, this.auth.local.password);
  } catch(err) {
      throw new Error(err);
  }
}

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;