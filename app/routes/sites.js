const Router = require('koa-router')
const siteController = require('../controllers/siteController')

let site = new Router
site.use(['/'], async (ctx,next) => {
    let views = ctx.session.views || 0
    ctx.session.views = ++views
    await next()
})
site.get('/', siteController.home)
site.get('/post/:id', siteController.siteBlogDetail)
site.get('/blog/add', siteController.siteAddBlog)
site.post('/blog/add', siteController.siteInfoAddPost)
site.post('/blog/favorite', siteController.postFavaAction)

module.exports = site