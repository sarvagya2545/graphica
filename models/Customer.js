const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Float = require('mongoose-float').loadType(mongoose,2);

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cart: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
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