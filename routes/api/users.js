const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/users');
const { signupValidationRules, loginValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

// router.get('/', (req,res) => console.log('User works'));
const PassportSignIn = passport.authenticate('local', { session: false });

router.route('/signup')
  .post(signupValidationRules(), validate, UserController.signup)
;

router.route('/login')
  .post(loginValidationRules(), validate, PassportSignIn, UserController.login)
;

module.exports = router;