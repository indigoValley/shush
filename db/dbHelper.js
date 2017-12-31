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
    User.create(user, { fields: ['name'] })
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
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
  }

} 