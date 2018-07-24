const Sequelize = require('sequelize')
const articles = require('../models/articles')
/**
 * 查询文章列表
 *
 * @param  {pageSize, pageNum} 每页展示条数, 页码
 * @return {JSONArray} 返回标签对应的文章信息
 */
const getArticles = async ctx => {
  let pageSize = ''
  let pageNum = ''
  let total = 0
  await articles.findAll().then(data => {
    total = data.length
  })
  await articles
    .findAll({
      attributes: [
        'postId',
        'date',
        'tags',
        'title',
        'desc',
        'detail',
        'readNum',
        'wordCount',
        'title'
      ],
      order: ['date']
    })
    .then(data => {
      let list = []
      if (ctx.request.query.pageSize) {
        pageSize = parseInt(ctx.request.query.pageSize)
        pageNum = parseInt(ctx.request.query.pageNum)
        list = data
          .reverse()
          .slice(pageSize * (pageNum - 1), pageSize + pageSize * (pageNum - 1))
        ctx.body = {
          msg: '查询成功',
          status: 200,
          total: Math.ceil(total / pageSize),
          pageNum: pageNum,
          pageSize: pageSize,
          datalist: list
        }
      } else {
        // 整理返参格式
        list = data.reverse()
        let yearList = []
        let result = []
        for (let i = 0; i < list.length; i++) {
          yearList.push(new Date(list[i].date).getFullYear())
        }
        yearList = [...new Set(yearList)]
        for (let i = 0; i < yearList.length; i++) {
          let obj = {
            year: yearList[i],
            list: []
          }
          for (let j = 0; j < list.length; j++) {
            if (yearList[i] === new Date(list[j].date).getFullYear()) {
              obj.list.push(list[j])
            }
          }
          result.push(obj)
        }
        ctx.body = {
          msg: '查询成功',
          status: 200,
          total: list.length,
          datalist: result
        }
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

/**
 * 阅读次数递增接口
 * POST
 * @param  {postId} 文章Id
 * @return {JSON} Id, 阅读次数
 */
const readNumIncrease = async ctx => {
  const postId = ctx.request.body.postId
  await articles.update({
    readNum: Sequelize.literal('readNum + 1')
  }, {
    where: {
      postId: postId
    }
  }).catch(err => {
    ctx.body = {
      msg: err,
      status: 999999
    }
  })
  await articles
    .findAll({
      where: {
        postId: postId
      },
      attributes: ['readNum']
    })
    .then(data => {
      ctx.body = {
        msg: '阅读次数查询成功',
        status: 200,
        postId: postId,
        readCount: data[0].dataValues.readNum
      }
    }).catch(err => {
      ctx.body = {
        msg: err,
        status: 999999
      }
    })
}

module.exports = {
  getArticles,
  getDetails,
  getDetail,
  readNumIncrease
}
