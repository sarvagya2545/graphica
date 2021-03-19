const mongoose = require('mongoose');
const Float = require('mongoose-float');

const transactionSchema = new mongoose.Schema({
    transactionID: {
        type: String, 
        required: true
    },  
    amount: {
        type: Float,
        required: true, 
        default: 0.0
    },
    items: [{ 
        id: {
            type: mongoose.Schema.Types.ObjectId,      //Send Design ID here
            ref: 'Design',
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Float,
            required: true
        },
        designer: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Design',
            required: true
        }
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