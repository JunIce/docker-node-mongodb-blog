const path = require('path')
let UserModel = require(path.resolve(__dirname, '../models/user'))
const {generatePassword} = require('../util')

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
    
        let gpassword = generatePassword(password)

        let user = await UserModel.findOne({username: username, password: gpassword})

        if(user) {
            ctx.cookies.set('username', user.username)
            ctx.cookies.set('userid', user.id)
            ctx.redirect('/')
            console.log('user exists')
        }else{
            console.log('user not exists')
        }
    }
}