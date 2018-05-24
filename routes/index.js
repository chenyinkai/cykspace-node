const router = require('koa-router')()
const tagsApi = require('../controllers/tags')
const articlesApi = require('../controllers/articles')

router.get('/v1/tags', tagsApi.getTags)
router.get('/v1/articles', articlesApi.getArticles)
router.get('/v1/details', articlesApi.getDetail)

router.post('/v1/readNum', articlesApi.readNumIncrease)

module.exports = router
