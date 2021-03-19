const mongoose = require('mongoose');
const Float = require('mongoose-float');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Float,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,      //Send Design ID here
        ref: 'Design',
        required: true,
    }],
    customer: {
        type: mongoose.Schema.Types.ObjectId,      //Send Customer ID here
        ref: 'Customer',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const Transaction = mongoose.model('transaction', transactionSchema);
module.exports = Transaction;