/**
 * Server index file to define servable routes
 * route-specific functions inside of lib/requestHelper.js
 */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const request = require('request');
const bodyParser = require('body-parser');
const util = require('./lib/requestHelper');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { User } = require('./db/config');
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

// set morgan to log info about our requests for development
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// handle /user route
app.get('/user', util.getUsers);
app.post('/user', util.addUser);

app.use(
  session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});


// route for user signup
app.route('/signup')
  .post((req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        req.session.user = user.dataValues;
        res.send(201, user);
      })
      .catch(error => {
        res.send(401, error);
      });
  });


// route for user Login
app.post('/login', util.authenticateUser);


// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.send(200, 'successful logout!');
  } else {
    res.send(401, 'user not logged in!');
  }
});

// handle /trigger route
app.get('/trigger', util.getUserTriggers);
app.post('/trigger', util.addTrigger);
app.put('/trigger', util.updateTrigger);
app.delete('/trigger', util.deleteTrigger);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
