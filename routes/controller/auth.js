const Designer = require("../../models/Designer");
const Customer = require("../../models/Customer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');

const signToken = (sub) => {
  return jwt.sign({
    sub,
    iss: 'Graphica',
    iat: new Date().getTime()
  }, jwtSecret, {
    expiresIn: '12h'
  });
}

module.exports = {
  signup: (role) => async (req,res) => {
    try {
      const { name, username, email, password } = req.body;

      const findEmailCustomer = await Customer.findOne({ "auth.email": email });
      const findEmailDesigner = await Designer.findOne({ "auth.email": email });
      const findUsernameCustomer = await Customer.findOne({ "auth.username": username });
      const findUsernameDesigner = await Designer.findOne({ "auth.username": username });

      if(findEmailDesigner || findEmailCustomer) {
        return res.status(400).json({errors: { email: 'Email is already in use' }});
      }

      if(findUsernameDesigner || findUsernameCustomer) {
        return res.status(400).json({errors: { username: 'The given username is already taken' }});
      }

      // console.log(findUsernameDesigner)
      // console.log(findUsernameCustomer)
      // console.log(findEmailCustomer)
      // console.log(findEmailDesigner)

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const details = {
        name,
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
      }

      var token = null;
      var user = null;

      if(role === 'designer') {
        const newDesigner = new Designer(details);
        await newDesigner.save();
        user = newDesigner;
      } else if(role === 'customer') {
        const newCustomer = new Customer(details);
        await newCustomer.save();
        user = newCustomer;
      }
      
      token = signToken(`${role === 'designer' ? 'Des' : 'Cus'}-${user._id}`);

      const userDetails = {
        name, 
        role,
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

    } catch (err) {
      console.log(err);
      res.status(500).json({errors: { err: "Server error" }});
    }
  },
  login: async (req,res) => {
    try {
      const user = req.user;
      console.log(req.user);

      const token = signToken(`${user.role === 'Des' ? 'Des' : 'Cus'}-${user._id}`);
      
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
      token = signToken(`${user.role === 'designer' ? 'Des' : 'Cus'}-${user._id}`);
      
      res.status(200).cookie('Auth', token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
      }).json({ token, user });
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