const Sequelize = require('sequelize')
const sequelize = require('../lib/db-init')
const tags = sequelize.define(
  'tags',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    tag: Sequelize.STRING(100),
    tagId: Sequelize.STRING(11)
  },
  {
    timestamps: false
  }
)

module.exports = tags
