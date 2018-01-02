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
  // get all users
  getUsers: function (callback) {
    User.findAll()
      .then((users) => {
        callback(null, users);
      })
      .catch((err) => {
        callback(err);
      });
  },
  // create new user
  addUser: function(user, callback) {
    User.generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        User.create(user, { fields: ['name', 'password'] })
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
  // create new trigger tied to user
  addTrigger: function(user, trigger, callback) {
    User.findById(user.id)
      .then((user) => {
        console.log('user', user);
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
  // get triggers of given user
  getUserTriggers: function (user, callback) {
    User.findById(user.id)
      .then((user) => {
        return user.getTriggers();
      })
      .then((triggers) => {
        callback(null, triggers);
      })
      .catch((err) => {
        callback(err);
      });
  },
  // update given trigger
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
      });
  },
  // delete given trigger
  deleteTrigger: function(trigger, callback) {
    Trigger.findById(trigger.id)
      .then((found) => {
        return found.destroy();
      })
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
};