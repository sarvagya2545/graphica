"strict"

const pay=function(app){

    const { URL} = require('url');
    const paypal = require('paypal-rest-sdk');
    const passport = require('passport');
    const User = require('../models/User');
    const Payment = require('../models/Payment');
    const Designer = require('../models/Designer');
    const Transaction = require('../models/Transaction');

    paypal.configure({
      'mode': 'sandbox',
      'client_id':  process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
    });
    app.get('/pay',passport.authenticate('jwt', { session: false }),(req,res)=>{
        res.send('<form action="/pay" method="post"><input type="submit" value="Buy"></form> ');
    });
    app.post("/pay", passport.authenticate('jwt', { session: false }), (req, res) =>{
      var items = [];
      let amount = 0;
      req.user.cart.forEach( cart => {
        var item = {
          name: cart.name,
          price: cart.price,
          currency: "USD",
          quantity: 1,
        }
        amount=amount+cart.price;
        items.push(item);
      });
      try {
        if(req.user.cart.length==0){
          throw new Error('Cart Empty');
        }
        const create_payment_json = {
          intent: "sale",
          payer: {
            payment_method: "paypal",
          },
          redirect_urls: {
            return_url: process.env.HOST+"/success",
            cancel_url: process.env.HOST+"/cancel",
          },
          transactions: [
            {
              item_list: {
                items: items 
              },
              amount: {
                total: amount,
                currency: "USD",
              },
            },
          ],
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            throw error;
          } else {
            console.log(payment);
            for(var link of payment.links){
              if (link.rel === "approval_url") {

                const myURL = new URL(link.href);

                const paymentInstance = new Payment({
                  paymentid: payment.id,
                  amount: amount,
                  userid: req.user._id,
                  token: myURL.searchParams.get('token'),
                });
                paymentInstance.save((err) =>{
                  if(err){
                    console.log(err);
                    throw err;
                  }else{
                    console.log('Saved payment');
                  }
                });
                res.redirect(link.href);
              }
            }
          }
        });
      } catch (error) {
        res.status(400).json({err:error.message});
      }
    });
    app.get("/success", (req, res) => {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      Payment.find({}, function (err, currentPayments) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
          currentPayments.forEach(currentPayment=>{
            if(currentPayment.paymentid==paymentId){
              let amount = currentPayment.amount;
              let userid=currentPayment.userid; 
              const execute_payment_json = {
                payer_id: payerId,
                transactions: [
                  {
                    amount: {
                      currency: "USD",
                      total: amount,
                    },
                  },
                ],
              };
              paypal.payment.execute(paymentId, execute_payment_json, function (error,payment){
                if (error) {
                  console.log(error.response);
                  throw error;
                } else {
                  res.send("Success");
                  User.findById(userid,function(Err,user){
                    if(Err){
                      console.log(Err);
                    }else{
                      let cart=user.cart;
                      cart.forEach(item=>{
                        Designer.findById(item.designer,function(ERR,designer){
                          if(ERR){
                            console.log(ERR);
                          }else{
                            let balance = designer.balance;
                            balance=balance+item.price;
                            Designer.updateOne( {_id:designer._id},{balance: balance},function(Error,resp){
                              if(Error){
                                console.log(Error);
                              }
                            });
                          }
                        });
                      });
                      const transaction = new Transaction({
                        transactionID: paymentId,
                        amount: amount,
                        items: user.cart,
                        user: userid,
                        isSuccessful: true,
                      });
                      transaction.save((ERr) =>{
                        if(ERr){
                          console.log(ERr);
                        }else{
                          console.log('success');
                        }
                      });
                      User.updateOne( {_id:user._id},{cart: []},function(ERRor,RES){
                        if(ERRor){
                          console.log(ERRor);
                        }
                      });
                    }
                  })
                }
              });
              Payment.findByIdAndDelete(currentPayment._id,function(ErR,doc){
                if(ErR){
                  console.log(ErR);
                }
              })
            }
          });
        }
      });
      
    });
    app.get("/cancel", (req, res) =>{
      const token=req.query.token;
      Payment.find({}, function (err, payments) {
        if(err){
          console.log(err);
        }else{
          payments.forEach(payment=>{
            if(payment.token==token){
              let amount = payment.amount;
              let userid = payment.userid; 
              let paymentId= payment.paymentid;
              User.findById(userid,function(ERR,user){
                if(ERR){
                  console.log(ERR);
                }else{
                  const transaction = new Transaction({
                    transactionID: paymentId,
                    amount: amount,
                    items: user.cart,
                    user: userid,
                    isSuccessful: false,
                  });
                  transaction.save((ERRor) =>{
                    if(ERRor){
                      console.log(ERRor);
                    }else{
                      console.log('success');
                    }
                  });
                }
              });
              Payment.findByIdAndDelete(payment._id,function(ErR,doc){
                if(ErR){
                  console.log(ErR);
                }
              });
            }
          });
        }
      });
    res.send('Cancel');
    });
}

module.exports=pay;