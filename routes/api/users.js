const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/users');
const { signupValidationRules, loginValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

// router.get('/', (req,res) => console.log('User works'));
const PassportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

const debugMiddleware = (req,res, next) => {
  console.log(req.body);
  console.log(req.headers);
  console.log(req.cookies);
  console.log(req);
  next();
}

router.route('/signup')
  .post(signupValidationRules(), validate, UserController.signup)
;

router.route('/login')
  .post(loginValidationRules(), validate, PassportSignIn, UserController.login)
;

// get the user details from token
router.route('/current')
  .get(passportJWT, UserController.getUser)
;

router.route('/cookie')
  .get(UserController.sendCookie)
;

router.route('/secret')
  .get(passportJWT, UserController.secret)
; 

module.exports = router;