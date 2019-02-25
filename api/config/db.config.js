const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,
    
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
// Models/tables
db.areas = require('../models/area.model')(sequelize, Sequelize);
db.users = require('../models/user.model')(sequelize, Sequelize);
db.rollets = require('../models/rollet.model')(sequelize, Sequelize);
db.plugs = require('../models/plug.model')(sequelize, Sequelize);
db.temps = require('../models/temp.model')(sequelize, Sequelize);
db.rgbs = require('../models/rgb.model')(sequelize, Sequelize);

// Relations
db.areas.hasMany(db.rollets);
db.areas.hasMany(db.plugs);
db.areas.hasMany(db.rgbs);

db.rollets.belongsTo(db.areas);
db.plugs.belongsTo(db.areas);
db.temps.belongsTo(db.areas);
db.rgbs.belongsTo(db.areas);
 
module.exports = db;