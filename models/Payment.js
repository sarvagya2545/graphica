const mongoose = require('mongoose');
const User = require('./User');
const Float = require('mongoose-float').loadType(mongoose,2);

const paymentSchema = new mongoose.Schema({
    paymentid: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Float,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

const Payment = mongoose.model('payment',paymentSchema);

module.exports = Payment;