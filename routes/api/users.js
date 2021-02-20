const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/users');
const { signupValidationRules } = require('../../validators/authValidators');
const validate = require('../../validators/validate');

// router.get('/', (req,res) => console.log('User works'));

router.route('/signup')
  .post(signupValidationRules(), validate, UserController.signup)
;

module.exports = router;