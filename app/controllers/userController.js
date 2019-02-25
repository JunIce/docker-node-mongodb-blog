const path = require('path')
let UserModel = require(path.resolve(__dirname, '../models/user'))

module.exports = {
    userLogin: async ctx => {
        await ctx.render('login')
    },
    userRegsiter: async (ctx) => {
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
    }
}