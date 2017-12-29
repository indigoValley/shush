const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


// define user table
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  // will add whatever isn't done through slack auth
});

const Moment = sequelize.define('moment', {
  dbChange: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,
});

Moment.belongsTo(User, { foreignKey: 'id_user' });

const Trigger = sequelize.define('trigger', {
  gate: Sequelize.INTEGER,
  duration: Sequelize.INTEGER,
  message: Sequelize.STRING,
});

Trigger.belongsTo(User, { foreignKey: 'id_user' });

const Event = sequelize.define('event', {
  timestamp: Sequelize.DATE,
});

Event.belongsTo(Trigger, { foreignKey: 'id_trigger' });

const Channel = sequelize.define('channel', {
  name: Sequelize.STRING,
});

const Channel_Trigger = sequelize.define('channel_trigger', {
});

Channel.belongsToMany(Trigger, { through: Channel_Trigger });
Trigger.belongsToMany(Channel, { through: Channel_Trigger });

User.sync();
Moment.sync();
Trigger.sync();
Event.sync();
Channel.sync();
Channel_Trigger.sync();

exports = {
  User,
  Moment,
  Trigger,
  Event,
  Channel,
  Channel_Trigger,
}