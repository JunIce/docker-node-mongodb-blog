const combineRouters = require('koa-combine-routers')

const site = require('./sites')
const user = require('./user')

module.exports = combineRouters(site, user)