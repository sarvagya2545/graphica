
const payment=function(app){
    
    const paypal = require('paypal-rest-sdk');
    const passport = require('passport');
    const User = require('../models/User');
    var items = [];
    var amount = 0;
    paypal.configure({
        'mode': 'sandbox',
        'client_id':  process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
    });

    //THIS PART IS FOR TESTING PURPOSE ONLY
    /*
    app.get('/pay',passport.authenticate('jwt', { session: false }),(req,res)=>{
        res.send('<form action="/pay" method="post"><input type="submit" value="Buy"></form> ');
    });
    */
   
    app.post("/pay", passport.authenticate('jwt', { session: false }), (req, res) =>{
      
      User.findById( req.user._id , function( err , user ) {
        if( !err ){
          user.cart.forEach( cart => {
            var item = {
              name: cart.name,
              price: cart.price,
              currency: "USD",
              quantity: 1,
            }
            amount=amount+cart.price;
            
            items.push(item);
          });
          console.log(items);
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
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  res.redirect(payment.links[i].href);
                }
              }
            }
          });
        } else {
          console.log(err);
        }
      });
    });
      
    app.get("/success",passport.authenticate('jwt', { session: false }), (req, res) => {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
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
          console.log(JSON.stringify(payment));
          res.send("Success");
        }
      });
    });
    app.get("/cancel",passport.authenticate('jwt', { session: false }), (req, res) => res.send("Cancelled"));
}

module.exports=payment;