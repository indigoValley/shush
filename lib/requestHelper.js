/**
 * Request helper file to handle specific requests and stay modular.
 * Create methods to handle routes here.
 */
const db = require('../db/dbHelper');

// testing routing
module.exports = {
  getUsers: function (req, res) {
    db.getUsers((err, users) => {
      if (err) {
        console.error('error getting users from database', err);
      } else {
        res.send(users);
      }
    });
  },
  addUser: function (req, res) {
    // uncomment when using real requests
    // const user = req.body;
    
    // test user
    const user = { name: 'bobby' };
    db.addUser(user, (err, newUser) =>  {
      if (err) {
        res.send(err);
      } else {
        res.send(newUser)
      }
    });
  },
  addTrigger: function (req, res) {
    // uncomment to get username from session
    // const username = req.session.user;

    // testing with user bobby
    const username = 'bobby';
    const trigger = req.body;
    db.addTrigger(username, trigger, (err, newTrigger) =>  {
      if (err) {
        res.send(err);
      } else {
        res.send(newTrigger);
      }
    });
  },
  getUserTriggers: function (req, res) {
    // uncomment to get username from session
    // const username = req.session.user;

    // testing with user bobby
    const username = 'bobby';
    db.getUserTriggers(username, (err, triggers) => {
      if (err) {
        res.send(err);
      } else {
        res.send(triggers);
      }
    });
  },
  updateTrigger: function (req, res) {
    const trigger = req.body;
    db.updateTrigger(trigger, (err, trigger) => {
      if (err) {
        res.send(err);
      } else {
        res.send(trigger);
      }
    })
  },
  deleteTrigger: function (req, res) {
    const trigger = req.body;
    db.deleteTrigger(trigger, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('deleted trigger');
      }
    })
  }
} 
