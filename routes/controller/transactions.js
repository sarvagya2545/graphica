const paypal = require('../../config/paypal');

module.exports = {
    PayThroughCarts: async(req,res) => {
        try {
            const { cart } = req.user;

            if(!cart.length) {
                return res.status(400).json({ msg: 'Error: cart is empty' });
            }

            const items = cart.map(cartItem => ({
                name: cartItem.name,
                price: cartItem.price,
                currency: 'USD',
                quantity: 1
            }));

            let amount = cart.reduce((sum, item) => sum + item.price, 0);

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
            }

            paypal.payment.create(create_payment_json, (err, payment) => {
                if(!err) {
                    console.log(payment);
                    
                    return;
                }

                return res.status(400).json({ err: err.message });
            })

        } catch (err) {
            console.log(err);
        }
    }
}