const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))
const {formatTime} = require('../util')


module.exports = {
    home: async ctx => {
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
    },
    siteAddBlog: async ctx => {
        await ctx.render('add')
    },
    siteBlogDetail: async ctx => {
        let {id} = ctx.params
        await BlogModel.increaseView(id)
        let blog = await BlogModel.findBlog(id)
        blog.create_at = formatTime(blog.date)
        let user = ctx.session.islogin
        let username = ''
        if(user) {
            username = ctx.cookies.get('username')
        }
        await ctx.render('post', {
            blog: blog,
            user: user,
            username: username
        })
    },
    siteInfoAddPost: async ctx => {
        let {title, content} = ctx.request.body
        let blog = new BlogModel({
            title: title,
            body: content,
            date: +new Date,
            author: ctx.cookies.get('username')
        })
    
        await blog.save((err) => {
            if(err) {
                throw new Error(err)
            }
            console.log(`success`)
        })
        ctx.redirect('/')
    }
}