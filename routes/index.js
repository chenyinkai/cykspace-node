const router = require('koa-router')()
const tagsApi = require('../controllers/tags')
const articlesApi = require('../controllers/articles')
// const relationsApi = require('../controllers/relations')

router.get('/v1/tags', tagsApi.getTags)
router.get('/v1/articles', articlesApi.getArticles)
// router.get('/v1/relations', relationsApi.getRelations)

module.exports = router
