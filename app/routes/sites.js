const Router = require('koa-router')
const siteController = require('../controllers/siteController')

let site = new Router

site.get('/', siteController.siteHome)

module.exports = site