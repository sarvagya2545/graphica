require('dotenv').config();
const express = require('express');
const app = express();
app.disable('x-powered-by');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');

const { mongoDBURL } = require('./config/keys');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
if(!process.env.NODE_ENV)
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser());

require('./config/passport');

// mongoose connection
mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Mongodb Connection error', err));

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/designs', require('./routes/api/designs'));
// require('./payment/withdraw')(app);

app.get('/pay',(req,res)=>{
  res.send(`<form action="/api/transactions/pay" method="post">
    <input type="submit" value="Buy">
  </form>`);
});
app.get('/withdraw',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send('<form action="/withdraw" method="post"> <input type="text" name="email"><input type="text" name="amount"><input type="submit" value="Withdraw"></form> ');
});


// Serve static assets under production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));