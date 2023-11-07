const Sequelize = require('sequelize');
const logger = require('../loggers/logger');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
  }
);
sequelize
  .authenticate()
  .then(() => {
    logger.info('Database is connected successfully....');
  })
  .catch((err) => {
    logger.error('error', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require('../models/userModel')(sequelize, Sequelize);


db.sequelize.sync().then(() => {
  logger.info('yes re-sync');
});

module.exports = db;
