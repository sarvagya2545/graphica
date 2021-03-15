"use strict";


const withdraw = function(app){

    const paypal = require('paypal-rest-sdk');
    const passport = require('passport');
    const Designer = require('../models/Designer');

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'headers' : {
            'custom': 'header'
        }
    });

    app.post("/withdraw", passport.authenticate('jwt', { session: false }), (req, res) =>{

        Designer.findById(req.user._id,function(err,designer){
            if(err){
                console.log(err);
            }else if(designer.balance>=req.body.amount&&req.body.amount>0){
                var sender_batch_id = Math.random().toString(36).substring(9);
                var create_payout_json = {
                    "sender_batch_header": {
                        "sender_batch_id": sender_batch_id,
                        "email_subject": "Graphica"
                    },
                    "items": [
                        {
                            "recipient_type": "EMAIL",
                            "amount": {
                                "value": req.body.amount,
                                "currency": "USD"
                            },
                            "receiver": req.body.email,
                            "note": "Thank you.",
                        }
                    ]
                };
                var sync_mode = 'false';
                paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
                    if (error) {
                        console.log(error.response);
                        throw error;
                    } else {
                        res.send('Success');
                        let updatedBalance=designer.balance-req.body.amount;
                        Designer.updateOne( {_id:req.user._id},{balance: updatedBalance},function(ERR,RES){
                            if(ERR){
                                console.log(RES);
                            }
                        });
                    }
                });
            }else{
                res.status(400).json({err:'Insufficient Balance'});
            }
        });
    });
}

module.exports = withdraw;