const relations = require('../modals/relations')

const getArticles = async ctx => {
  let condition = '' // 查询条件 为空查询所有
  let result = [] // 返回标签对应的文章id
  if (ctx.request.query.tagId) {
    condition = {
      where: {
        tagId: ctx.request.query.tagId
      }
    }
  } else {
    condition = {}
  }
  await relations.findAll(condition).then(data => {
    for (let i = 0; i < data.length; i++) {
      result.push(data[i].dataValues.postId)
    }
  })
  return result
}

module.exports = {
  getArticles
}
