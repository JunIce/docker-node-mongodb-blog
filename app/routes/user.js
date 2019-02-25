const Router = require('koa-router')
const UserController = require('../controllers/userController')

let user = new Router

user.prefix('/user')

user.get('/login', UserController.userLogin)

module.exports = user