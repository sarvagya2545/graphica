const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String,
        
    },
    amount: {
        type: Number,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,      //Send Design ID here
        ref: 'Design',
        required: true,
    }],
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