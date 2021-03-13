"use strict";
require('dotenv').config()

var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
    'headers' : {
		'custom': 'header'
    }
});

var sender_batch_id = Math.random().toString(36).substring(9);

var create_payout_json = {
    "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payment"
    },
    "items": [
        {
            "recipient_type": "EMAIL",
            "amount": {
                "value": 90.0,
                "currency": "USD"
            },
            "receiver": "ajith@graphica.com",
            "note": "Thank you.",
            "sender_item_id": "item_3"
        }
    ]
};

var sync_mode = 'false';

paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Create Single Payout Response");
        console.log(payout);
    }
});