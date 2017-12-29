/**
 * Server index file to define servable routes
 * route-specific functions inside of lib/requestHelper.js
 */

const express = require('express');
const bodyParser = require('body-parser');
const util = require('./lib/requestHelper');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// testing request helper
app.get('/home', util.getHome);

// testing database
app.get('/user', util.getUsers);
app.post('/user', util.addUser);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})