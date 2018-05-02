const tags = require('../modals/tags')
const relations = require('../controllers/relations')

const getTags = async ctx => {
  let tagArticle = [] // 每个标签对应的文章id
  let tagList = [] // 标签列表
  let tagIdList = [] // 标签ID列表
  // 存在tagId, 只查询tagId对应的标签及文章
  if (ctx.request.query.tagId) {
    await relations.getArticles(ctx).then(res => {
      tagArticle = res
    })
    await tags
      .findAll({ where: { tagId: ctx.request.query.tagId } })
      .then(data => {
        data[0].dataValues['articles'] = tagArticle
        tagList = data[0].dataValues
        ctx.body = {
          msg: '查询成功',
          state: 200,
          list: tagList
        }
      })
      .catch(err => {
        ctx.body = {
          msg: err,
          state: 999999
        }
      })
  } else {
    await tags
      .findAll()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          tagIdList.push(data[i].dataValues.tagId)
          tagList.push(data[i].dataValues)
        }
      })
      .catch(err => {
        ctx.body = {
          msg: err,
          state: 999999
        }
      })
    for (let i = 0; i < tagIdList.length; i++) {
      await relations.getArticles(tagIdList[i]).then(res => {
        tagList[i].articles = res
      })
    }
    ctx.body = {
      msg: '查询成功',
      list: tagList
    }
  }
}

module.exports = {
  getTags
}
