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
    User.create(user, { fields: ['name'] })
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      });
  },

} 