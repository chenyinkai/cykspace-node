const tags = require('../modals/tags')
const relations = require('../controllers/relations')

const getTags = async ctx => {
  let condition = '' // 查询条件 为空查询所有
  let tagArticle = [] // 每个标签对应的文章id
  let articleList = []
  if (ctx.request.query.tagId) {
    condition = { where: { tagId: ctx.request.query.tagId } }
  } else {
    condition = {}
  }
  await relations.getArticles(ctx).then(res => {
    tagArticle = res
  })
  await tags.findAll(condition).then(data => {
    for (let i = 0; i < data.length; i++) {
      data[i].dataValues['articles'] = tagArticle
      articleList.push(data[i].dataValues)
    }
    ctx.body = {
      msg: '查询成功',
      list: articleList
    }
  })
}

module.exports = {
  getTags
}
