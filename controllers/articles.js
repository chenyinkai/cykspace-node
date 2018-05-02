const articles = require('../modals/articles')

/**
 * 待完成
 *
 * @param  {tagId} 标签Id
 * @return {JSONArray} 返回标签对应的文章信息
 */
const getArticles = async ctx => {
  await articles.findAll().then(data => {
    ctx.body = {
      msg: '查询成功',
      data: data
    }
  })
}

/**
 * 通过文章ID查询文章
 *
 * @param  {postId} 文章Id
 * @return {JSONArray} 返回文章信息
 */
const getDetails = async postId => {
  let result = []
  await articles.findAll({
    where: {
      postId: postId
    }
  }).then(data => {
    for (let i = 0; i < data.length; i++) {
      // 整理返参格式
      let resObj = {}
      resObj.postId = data[i].dataValues.postId
      resObj.date = data[i].dataValues.date
      resObj.title = data[i].dataValues.title
      result.push(resObj)
    }
  })
  return result
}

module.exports = {
  getArticles,
  getDetails
}
