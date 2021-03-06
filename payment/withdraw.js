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
            if(designer.balance>=req.body.amount&&req.body.amount>0&&!err){
                var create_payout_json = {
                    "sender_batch_header": {
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
                        console.log(payout);
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
                //Insufficient Balance
                res.status(400).json({err:err.message});
            }
        });
    });
}

module.exports = withdraw;