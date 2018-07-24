const relations = require('../models/relations')
const articles = require('../controllers/articles')

/**
 * 通过标签查询文章信息
 *
 * @param  {tagId} 标签Id
 * @return {JSONArray} 返回标签对应的文章信息
 */
const getArticles = async ctx => {
  let condition = '' // 查询条件
  let postIdList = []
  let result = [] // 返回标签对应的文章信息
  let getDetailsArray = []
  if (ctx.request && ctx.request.query.tagId) {
    condition = {
      where: {
        tagId: ctx.request.query.tagId
      }
    }
  } else {
    condition = {
      where: {
        tagId: ctx
      }
    }
  }
  await relations.findAll(condition).then(data => {
    for (let i = 0; i < data.length; i++) {
      postIdList.push(data[i].dataValues.postId)
    }
  })
  for (let i = 0; i < postIdList.length; i++) {
    getDetailsArray.push(articles.getDetails(postIdList[i]))
  }
  await Promise.all(getDetailsArray).then(data => {
    result = data
  })
  return result
}

module.exports = {
  getArticles
}
