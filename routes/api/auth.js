const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controller/auth');
const { signupValidationRules, loginValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

const PassportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/customer/signup')
  .post(signupValidationRules(), validate, AuthController.signup('customer'))
;

router.route('/designer/signup')
  .post(signupValidationRules(), validate, AuthController.signup('designer'))
;

router.route('/login')
  .post(loginValidationRules(), validate, PassportSignIn, AuthController.login)
;

// get the user details from token
router.route('/current')
  .get(passportJWT, AuthController.getUser)
;

// logout route
router.route('/logout')
  .post(AuthController.logout)
;

router.route('/cookie')
  .get(AuthController.sendCookie)
;

router.route('/secret')
  // .get(debugMiddleware, passportJWT, AuthController.secret)
; 

module.exports = router;