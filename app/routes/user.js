const Router = require('koa-router')
const UserController = require('../controllers/userController')

let user = new Router

user.prefix('/user')

user.get('/login', UserController.userLogin)
user.get('/logout', UserController.userLogout)

user.post('/login', UserController.userLoginPost)
user.post('/register', UserController.userRegsiterPost)

module.exports = user