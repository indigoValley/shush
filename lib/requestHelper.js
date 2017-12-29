/**
 * request helper file to handle specific requests and stay modular
 */
const db = require('../db/dbHelper');

// testing routing
module.exports = {
  getHome: function (req, res) {
    res.send('request helper working');
  },
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
    
    // test data
    const user = { name: 'bobby' };
    db.addUser(user, (err, newUser) =>  {
      if (err) {
        console.error('error adding user to database', err);
      } else {
        res.send(newUser)
      }
    });
  }
} 

// db.saveOAuth

// testing database
// exports.getUsers 

