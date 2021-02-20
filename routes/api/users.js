const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controller/users');

// router.get('/', (req,res) => console.log('User works'));

router.route('/signup')
  .post(UserController.signup)
;

module.exports = router;