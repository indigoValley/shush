/**
 * Server index file to define servable routes
 * route-specific functions inside of lib/requestHelper.js
 */
require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const util = require('./lib/requestHelper');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { User } = require('./db/config');
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

// set morgan to log info about our requests for development
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// testing request helper
app.get('/home', util.getHome);

// testing database
app.get('/user', util.getUsers);
app.post('/user', util.addUser);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// deploy test comment