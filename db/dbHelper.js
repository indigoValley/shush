const {
  User,
  Moment,
  Trigger,
  Event,
  Channel,
  Channel_Trigger,
} = require('./config');

module.exports = {
getUsers: function (callback) {
    User.findAll()
      .then((users) => {
        callback(null, users);
      })
      .catch((err) => {
        callback(err);
      });
  },
  addUser: function(user, callback) {
    User.generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        console.log(user.password);
        User.create(user, { fields: ['name', 'email', 'password'] })
          .then(user => {
            callback(null, user);
          })
          .catch(err => {
            callback(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },

} 

// Test for commit issues