const config = require("../../config/bd.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
  },
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

//test connection
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.story = require("../models/story.model.js")(sequelize, Sequelize);
db.chapter = require("../models/chapter.model.js")(sequelize, Sequelize);

db.user.hasMany(db.story, { foreignKey: 'userId' });
db.story.belongsTo(db.user, { foreignKey: 'userId' });

db.story.hasMany(db.chapter, { foreignKey: 'storyId' });
db.chapter.belongsTo(db.story, { foreignKey: 'storyId' });

//create table if not exist
sequelize.sync({ alter: true }).then(() => {
  //working with our updated table
}).catch((err) => {
  console.log(err);
});

module.exports = db;
