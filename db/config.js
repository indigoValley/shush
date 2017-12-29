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
User.sync();

const Moment = sequelize.define('moment', {
  dbChange: Sequelize.INTEGER,
  timestamp: Sequelize.DATE,
});

Moment.belongsTo(User, { foreignKey: 'id_user' });
Moment.sync();

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
Event.sync();

const Channel = sequelize.define('channel', {
  name: Sequelize.STRING,
});

const Channel_Trigger = sequelize.define('channel_trigger', {
});
Channel_Trigger.sync();

Channel.belongsToMany(Trigger, { through: Channel_Trigger });
Trigger.belongsToMany(Channel, { through: Channel_Trigger });
Trigger.sync();
Channel.sync();


module.exports = {
  User,
  Moment,
  Trigger,
  Event,
  Channel,
  Channel_Trigger,
}