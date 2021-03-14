const mongoose = require('mongoose');
const Design = require('./Design');
const User = require('./User');
const Designer = require('./Designer');
const { Schema } = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,2);
const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    amount: {
        type: Float,
        required: true,
    },
    items: [{
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
          type: Schema.Types.ObjectId,
          ref: 'Designer',
          required: true,
        }
      }],
    user: {type: mongoose.Schema.Types.ObjectId,      //Send Customer ID here
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isSuccessful: {
        type: Boolean,
        default: false,
    },
});

const Transaction = mongoose.model('transaction',transactionSchema);
module.exports = Transaction;