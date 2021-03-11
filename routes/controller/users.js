const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');

const signToken = (user) => {
  return jwt.sign({
    sub: user._id,
    iss: 'Graphica',
    iat: new Date().getTime()
  }, jwtSecret, {
    expiresIn: '24h'
  });
}

module.exports = {
  signup: async (req,res) => {
    try {
      const { username, email, password } = req.body;

      const findEmailUser = await User.findOne({ "auth.email": email });
      const findUsernameUser = await User.findOne({ "auth.username": username });

      if(findEmailUser) {
        return res.status(400).json({errors: { email: 'Email is already in use' }});
      }

      if(findUsernameUser) {
        return res.status(400).json({errors: { username: 'The given username is already taken' }});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        config: {
          method: 'local'
        },
        auth: {
          username,
          email,
          local: {
            password: hashedPassword
          }
        }
      });

      await user.save();

      // generate token
      const token = signToken(user);

      const userDetails = {
        config: user.config,
        auth: {
          email: user.auth.email,
          username: user.auth.username
        },
        id: user._id
      }

      res.status(201).cookie('Auth', token, {
        sameSite: 'strict',
        maxAge: 24 * 60 * 60,
        httpOnly: true
      }).json({ token, user: userDetails });

      // .json({ token, user: userDetails })

    } catch (err) {
      console.log(err);
      res.status(500).json({errors: { err: "Server error" }});
    }
  },
  login: async (req,res) => {
    try {
      const user = req.user._doc;
      const token = signToken(user);
      
      const payload = {
        token,
        user
      }

      res.cookie('Auth', token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
        // secure: true
      }).json(payload);

    } catch (err) {
      console.log(err);
      res.status(500).json({errors: { err: "Server error" }});
    }
  },
  logout: async (req,res) => {
    try {
      res.status(202).clearCookie('Auth').send('Logged out of the session');
    } catch (error) {
      console.log(error);
      res.status(500).json({errors: { err: "Server error" }});
    }
  },
  getUser: async (req,res) => {
    try {
      const user = req.user;
      const token = signToken(user);
      console.log('REACHED HERE!!!!');

      res.cookie('Auth', token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
      });
      
      res.status(200).json({ token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({errors: { err: "Server error" }}); 
    }
  },
  sendCookie: async (req,res) => {
    res.cookie('Name', 'Sarvagya Sharma', {
      maxAge: 24 * 60 * 60,
      httpOnly: true
    }).json({ payload: 'Set cookie' })
  },
  secret: async(req,res) => {
    res.send('SECRET');
  }
}