/**
 * Request helper file to handle specific requests and stay modular.
 * Create methods to handle routes here.
 */
const db = require('../db/dbHelper');
const { User } = require('../db/config');

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
    const user = req.body;
    
    // test data
    // const user = { name: 'Dang Thanh', email: 'thanh@example.com', password: 'foobar' };
    db.addUser(user, (err, newUser) => {
      if (err) {
        res.send(err);
      } else {
        res.send(newUser);
      }
    });
  },
  addTrigger: function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      // uncomment to get username from session
      const user = req.session.user;
      const trigger = req.body;
      db.addTrigger(user, trigger, (err, newTrigger) => {
        if (err) {
          res.send(err);
        } else {
          res.send(newTrigger);
        }
      });
    } else {
      res.send(401, 'unauthorized request');
    }
  },
  
  authenticateUser: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ where: { name: username } }).then(function (user) {
      if (!user) {
        res.send(404, 'invalid username');
      } else if (!user.validPassword(password)) {
        res.send(401, 'invalid password');
      } else {
        req.session.user = user.dataValues;
        res.send(200, 'user logged in');
        // db.getUserTriggers(username, (err, triggers) => {
        //   if (err) {
        //     res.send(err);
        //   } else {
        //     res.send(triggers);
        //   }
        // });
      }
    });
  },

  getUserTriggers: function (req, res) {
    console.log('in getUserTriggers');
    if (req.session.user && req.cookies.user_sid) {
      const username = req.session.user;
      db.getUserTriggers(username, (err, triggers) => {
        if (err) {
          res.send(err);
        } else {
          res.send(triggers);
        }
      });
    } else {
      res.send(401, 'unauthorized request');
    }
  },
  updateTrigger: function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      const trigger = req.body;
      db.updateTrigger(trigger, (err, trigger) => {
        if (err) {
          res.send(err);
        } else {
          res.send(trigger);
        }
      });
    } else {
      res.send(401, 'unauthorized request');
    }
  },
  deleteTrigger: function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
      const trigger = req.body;
      db.deleteTrigger(trigger, err => {
        if (err) {
          res.send(err);
        } else {
          res.send('deleted trigger');
        }
      });
    } else {
      res.send(401, 'unauthorized request');
    }
  }
};
