const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))

module.exports = {
    siteHome: async ctx => {
        let user = ctx.session.islogin
        let username = ''
        if(user) {
            username = ctx.cookies.get('username')
        }
        let blogs = await BlogModel.find() || []

        await ctx.render('index', {
            views: ctx.session.views,
            user: user,
            username: username,
            blogs: blogs
        })
    }
}