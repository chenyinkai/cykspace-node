const Sequelize = require('sequelize')
const config = require('./config')
const sequelize = new Sequelize(
  config.database.DATABASE,
  config.database.USERNAME,
  config.database.PASSWORD,
  {
    host: config.database.HOST,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = sequelize
