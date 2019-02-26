const path = require('path')
const rndStr = require('randomstring')
let UserModel = require(path.resolve(__dirname, '../models/user'))
const {generatePassword, generateToken} = require('../util')

module.exports = {
    userLogin: async ctx => {
        await ctx.render('login')
    },
    userLogout: async ctx => {
        ctx.session.u = null
        ctx.redirect('/')
    },
    userRegsiterPost: async (ctx) => {
        let { email, username, password} = ctx.request.body
        // 参数不全
        if(!email || !username || !password) {
            ctx.body = {
                status: 400,
                message: '请输入用户名，邮箱，密码'
            }
            return
        }
        // 用户米已存在
        let isExists = await UserModel.userExists(username)
        if(isExists) {
            ctx.body = {
                status: 400,
                message: '用户已存在'
            }
            return;
        }

        await UserModel.createUser(username, password, email)
        ctx.body = {
            status: 200,
            message: '注册成功'
        }
        console.log(await UserModel.find())
    },
    userLoginPost: async ctx => {
        let {username, password} = ctx.request.body

        let userExists = username && await UserModel.userExists(username)

        // 用户不存在
        if(!userExists) { 
            ctx.body = {
                status: 500,
                message: '用户名不存在'
            }
            return
        }

        let gpassword = generatePassword(password)
        let user = await UserModel.findOne({username: username, password: gpassword})
        // 密码错误
        if(!user) {
            ctx.body = {
                status: 500,
                message: '用户名或密码不正确'
            }
            return;
        }

        // 写入session, 并重定向
        let s = rndStr.generate(12)

        ctx.session.u = {
            uname: user.username,
            uid: user.id,
            token: generateToken(user.id, user.username, s)
        }

        await UserModel.findOneAndUpdate({_id: user.id}, {rnd: s})
        ctx.body = {
            status: 200,
            message: '登录成功'
        }
    }
}