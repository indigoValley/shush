const axios = require('axios');

module.exports = {
  userSignup: function(user, callback) {
    axios.post('/signup', user)
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      });
  },
  userLogin: function(user, callback) {
    axios.post('/login', user)
      .then((user) => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
  userLogout: function(callback) {
    axios.get('/logout')
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
  addTrigger: function(trigger, callback) {
    axios.post('/trigger', trigger)
      .then((trigger) => {
        callback(null, trigger);
      })
      .catch((err) => {
        callback(err);
      });
  },
  getTriggers: function(callback) {
    axios.get('/trigger')
      .then((triggers) => {
        callback(null, triggers);
      })
      .catch((err) => {
        callback(err);
      });
  },
  updateTrigger: function(trigger, callback) {
    axios.put('/trigger', trigger)
      .then((updatedTrigger) => {
        callback(null, updatedTrigger);
      })
      .catch((err) => {
        callback(err);
      });
  },
  deleteTrigger: function(trigger, callback) {
    axios.delete('/trigger', trigger)
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
}