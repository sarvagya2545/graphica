"strict"

const payment=function(app){

    const { URL, URLSearchParams } = require('url');
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
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {

                const myURL = new URL(payment.links[i].href);

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
                res.redirect(payment.links[i].href);
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
      Payment.findOneAndDelete({paymentid: paymentId}, function (err, payment) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
          let amount = payment.amount;
          let userid=payment.userid; 
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
              User.findById(userid,function(err,user){
                if(err){
                  console.log(err);
                }else{
                  let cart=user.cart;
                  cart.forEach(item=>{
                    Designer.findById(item.designer,function(err,designer){
                      if(err){
                        console.log(err);
                      }else{
                        let balance = designer.balance;
                        balance=balance+item.price;
                        Designer.updateOne( {_id:designer._id},{balance: balance},function(err,res){
                          if(err){
                            console.log(err);
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
                  transaction.save((err) =>{
                    if(err){
                      console.log(err);
                    }else{
                      console.log('success');
                    }
                  });
                  User.updateOne( {_id:user._id},{cart: []},function(err,res){
                    if(err){
                      console.log(err);
                    }
                  });
                }
              })
            }
          });
        }
      });
      
    });
    app.get("/cancel", (req, res) =>{
      const token=req.query.token;
      Payment.findOneAndDelete({token: token}, function (err, payment) {
        if(err){
          console.log(err);
        }else{
          let amount = payment.amount;
          let userid = payment.userid; 
          let paymentId= payment.paymentid;
          User.findById(userid,function(err,user){
            if(err){
              console.log(err);
            }else{
              const transaction = new Transaction({
                transactionID: paymentId,
                amount: amount,
                items: user.cart,
                user: userid,
                isSuccessful: false,
              });
              transaction.save((err) =>{
                if(err){
                  console.log(err);
                }else{
                  console.log('success');
                }
              });
            }
          });
        }
      });
    res.send('Cancel');
    });
}

module.exports=payment;