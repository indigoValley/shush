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

app.use(express.static(`${__dirname}/dist`));

// set morgan to log info about our requests for development
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// })
app.get("/auth/redirect", (req, res) => {
  var options = {
    uri:
      "https://slack.com/api/oauth.access?code=" +
      req.query.code +
      "&client_id=" +
      process.env.CLIENT_ID +
      "&client_secret=" +
      process.env.CLIENT_SECRET +
      "&redirect_uri=" +
      process.env.REDIRECT_URI,
    method: "GET"
  };
  request(options, (error, response, body) => {
    var JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res
        .send("Error encountered: \n" + JSON.stringify(JSONresponse))
        .status(200)
        .end();
    } else {
      console.log(JSONresponse);
      res.send("Success!");
    }
  });
});

// handle /user route
app.get('/user', util.getUsers);
app.post('/user', util.addUser);

// handle /trigger route
app.get('/trigger', util.getUserTriggers);
app.post('/trigger', util.addTrigger);
app.put('/trigger', util.updateTrigger);
app.delete('/trigger', util.deleteTrigger);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
