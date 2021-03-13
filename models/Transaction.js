const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        
    },
    amount: {
        type: Number,
    },
    designer: {
        type: mongoose.Schema.Types.ObjectId,      //Send Designer ID here
        ref: 'Designer',
        required: true,
    },
    customer: {type: mongoose.Schema.Types.ObjectId,      //Send Customer ID here
        ref: 'Customer',
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

const Transaction = mongoose.model('transaction')
module.exports = Transaction;