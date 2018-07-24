const tags = require('../models/tags')
const relations = require('../controllers/relations')

/**
 * 标签查询
 *
 * @param  {tagId} 非必须 标签Id
 * @return {JSONArray} 返回标签列表以及该标签对应的文章
 */
const getTags = async ctx => {
  let tagArticle = [] // 每个标签对应的文章id
  let tagList = [] // 标签列表
  let tagIdList = [] // 标签ID列表
  // 存在tagId, 只查询tagId对应的标签及文章
  if (ctx.request.query.tagId) {
    await relations.getArticles(ctx).then(data => {
      tagArticle = data
    })
    await tags
      .findAll({
        where: {
          tagId: ctx.request.query.tagId
        },
        attributes: ['tagId', 'tag']
      })
      .then(data => {
        ctx.body = {
          msg: '标签查询成功',
          status: 200,
          tagId: data[0].dataValues.tagId,
          tagName: data[0].dataValues.tag,
          articles: tagArticle
        }
      })
      .catch(err => {
        ctx.body = {
          msg: err,
          status: 999999
        }
      })
  } else {
    await tags
      .findAll({
        attributes: ['tagId', 'tag']
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          tagIdList.push(data[i].dataValues.tagId)
          tagList.push(data[i].dataValues)
        }
      })
      .catch(err => {
        ctx.body = {
          msg: err,
          status: 999999
        }
      })
    for (let i = 0; i < tagIdList.length; i++) {
      await relations.getArticles(tagIdList[i]).then(data => {
        tagList[i].articles = data
      })
    }
    ctx.body = {
      msg: '标签列表查询成功',
      status: 200,
      tagsList: tagList
    }
  }
}

module.exports = {
  getTags
}
