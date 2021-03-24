const express = require('express');
const router = express.Router();
const paypal = require('../../config/paypal');
const TransactionController = require('../controller/transactions');
const passport = require('passport');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/pay')
    .post(passportJWT, TransactionController.PayThroughCarts)
;

module.exports = router;