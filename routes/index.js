const router = require('koa-router')()
const tagsApi = require('../controllers/tags')
const articlesApi = require('../controllers/articles')

router.get('/v1/tags', tagsApi.getTags)
router.get('/v1/articles', articlesApi.getArticles)

module.exports = router
