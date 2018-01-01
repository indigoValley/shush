/**
 * Database helper file
 * Create methods to interact with database here.
 */

const {
  User,
  Moment,
  Trigger,
  Event,
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
  addTrigger: function(username, trigger, callback) {
    User.findOne({ where: { name: username } })
      .then((user) => {
        trigger['id_user'] = user.id;
        return Trigger.create(trigger, { fields: ['gate', 'message', 'clip', 'id_user'] });
      })
      .then((newTrigger) => {
        callback(null, newTrigger);
      })
      .catch((err) => {
        callback(err);
      });
  },
  getUserTriggers: function (username, callback) {
    User.findOne({ where: { name: username } })
      .then((user) => {
        return user.getTriggers()
      })
      .then((triggers) => {
        callback(triggers);
      })
      .catch((err) => {
        callback(err);
      })
  },
  updateTrigger: function(trigger, callback) {
    Trigger.findById(trigger.id)
      .then((found) => {
        return found.update(trigger, { fields: ['gate', 'message', 'clip'] });
      })
      .then((updatedTrigger) => {
        callback(null, updatedTrigger);
      })
      .catch((err) => {
        callback(err);
      })
  },
  deleteTrigger: function(trigger, callback) {
    Trigger.findById(trigger.id)
      .then((found) => {
        return found.destroy();
      })
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  },

};