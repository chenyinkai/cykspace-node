const Sequelize = require('sequelize')
const sequelize = require('../lib/db-init')
const relations = sequelize.define(
  'relations',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    postId: Sequelize.STRING(11),
    tagId: Sequelize.STRING(100)
  },
  {
    timestamps: false
  }
)

module.exports = relations
