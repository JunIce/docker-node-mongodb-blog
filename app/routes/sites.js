const Router = require('koa-router')
const siteController = require('../controllers/siteController')

let site = new Router

site.get('/', siteController.home)
site.get('/post/:id', siteController.siteBlogDetail)
site.get('/post/add', siteController.siteAddBlog)

site.post('/post/add', siteController.siteInfoAddPost)

module.exports = site