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
 * 通过文章ID查询文章(供标签接口使用)
 *
 * @param  {postId} 文章Id
 * @return {JSONArray} 返回文章信息
 */
const getDetails = async postId => {
  let result = []
  await articles
    .findAll({
      where: {
        postId: postId
      }
    })
    .then(data => {
      // 整理返参格式
      let resObj = {}
      resObj.postId = data[0].dataValues.postId
      resObj.date = data[0].dataValues.date
      resObj.title = data[0].dataValues.title
      result.push(resObj)
    })
  return result
}

/**
 * 通过文章ID查询文章详情
 *
 * @param  {postId} 文章Id
 * @return {JSONArray} 返回文章信息
 */
const getDetail = async ctx => {
  const postId = ctx.request.query.postId
  await articles
    .findAll({
      where: {
        postId: postId
      }
    })
    .then(data => {
      data[0].dataValues.msg = '文章详情查询成功'
      data[0].dataValues.status = 200
      ctx.body = data[0].dataValues
    })
    .catch(err => {
      ctx.body = {
        msg: err,
        status: 999999
      }
    })
}

module.exports = {
  getArticles,
  getDetails,
  getDetail
}
