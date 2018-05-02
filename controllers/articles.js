const articles = require('../modals/articles')

const getArticles = async ctx => {
  await articles.findAll().then(data => {
    ctx.body = {
      msg: '查询成功',
      data: data
    }
  })
}

module.exports = {
  getArticles
}
