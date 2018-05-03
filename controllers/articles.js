const articles = require('../modals/articles')
const sequelize = require('sequelize')
/**
 * 待完成
 *
 * @param  {pageSize, pageNum} 每页展示条数, 页码
 * @return {JSONArray} 返回标签对应的文章信息
 */
const getArticles = async ctx => {
  const pageSize = parseInt(ctx.request.query.pageSize)
  const pageNum = parseInt(ctx.request.query.pageNum) - 1
  await articles
    .findAll({
      offset: pageNum,
      limit: pageSize,
      attributes: ['postId', 'date', 'tags', 'title', 'desc', 'detail', 'readNum', 'wordCount', 'title']
    })
    .then(data => {
      ctx.body = {
        msg: '查询成功',
        status: 200,
        datalist: data
      }
    })
    .catch(err => {
      ctx.body = {
        msg: err,
        status: 999999
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
      },
      attributes: ['postId', 'date', 'title']
    })
    .then(data => {
      result.push(data[0].dataValues)
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
