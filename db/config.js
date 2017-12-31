/**
 * Database configuration file
 * Set up schemas and table associations here.
 * To connect to cloud database, use the db password below with the cloud_sql_proxy running
 */

const Sequelize = require('sequelize');
// db password: NC8Jo8GGBp6CodbP
// start proxy: ./cloud_sql_proxy -instances="indigovalley-shush:us-central1:iv-shush"=tcp:3306

let pw = '';
if (process.env.PROD) {
  console.log('set pw');
  pw = 'NC8Jo8GGBp6CodbP';
}
const sequelize = new Sequelize('shush', 'root', pw, {
  host: '127.0.0.1',
  dialect: 'mysql',
});


// define user table
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  // will add whatever isn't done through slack auth
});

const Moment = sequelize.define('moment', {
  dbChange: Sequelize.FLOAT,
  timestamp: Sequelize.DATE,
});

Moment.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Moment, { foreignKey: 'id_user' });

const Trigger = sequelize.define('trigger', {
  gate: Sequelize.FLOAT,
  message: Sequelize.STRING,
  clip: Sequelize.STRING,
});

User.hasMany(Trigger, { foreignKey: 'id_user' });
Trigger.belongsTo(User, { foreignKey: 'id_user' });

const Event = sequelize.define('event', {
  timestamp: Sequelize.DATE,
});

Trigger.hasMany(Event, { foreignKey: 'id_trigger' });
Event.belongsTo(Trigger, { foreignKey: 'id_trigger' });

User.sync();
Moment.sync();
Trigger.sync();
Event.sync();

module.exports = {
  User,
  Moment,
  Trigger,
  Event,
}