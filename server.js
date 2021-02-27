require('dotenv').config();
const express = require('express');
const app = express();
app.disable('x-powered-by');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const { mongoDBURL } = require('./config/keys');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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

// Serve static assets under production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Routes
app.use('/api/users', require('./routes/api/users'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));