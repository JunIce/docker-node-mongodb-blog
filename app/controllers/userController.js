const path = require('path')
const rndStr = require('randomstring')
let UserModel = require(path.resolve(__dirname, '../models/user'))
const {generatePassword, generateToken} = require('../util')

module.exports = {
    userLogin: async ctx => {
        await ctx.render('login')
    },
    userLogout: async ctx => {
        ctx.session.islogin = null
        ctx.redirect('/')
    },
    userRegsiterPost: async (ctx) => {
        let { email, username, password} = ctx.request.body
        let isExists = await UserModel.userIsExists(username)
        // await UserModel.remove({})
        if(isExists) {
            ctx.body = {
                data: '用户已存在'
            }
        } else {
            await UserModel.create({
                email: email,
                username: username,
                password: generatePassword(password),
                create_at: +new Date
            })
            console.log(await UserModel.find())
        }
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