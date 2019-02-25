const Router = require('koa-router')
const UserController = require('../controllers/userController')

let user = new Router

user.prefix('/user')

user.get('login', UserController.userRegsiter)

module.exports = user