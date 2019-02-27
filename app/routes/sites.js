const Router = require('koa-router')
const siteController = require('../controllers/siteController')

let site = new Router

site.get('/', siteController.home)
site.get('/post/:id', siteController.siteBlogDetail)
site.get('/blog/add', siteController.siteAddBlog)
site.post('/blog/add', siteController.siteInfoAddPost)
site.post('/blog/favorite', siteController.postFavaAction)

module.exports = site