const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))
let UserModel = require(path.resolve(__dirname, '../models/user'))

const {formatTime} = require('../util')


module.exports = {
    home: async ctx => {
        let u = ctx.session.u
        let user =  u ? await UserModel.findOne({_id: u.uid, username: u.uname}) : null;

        let blogs = await BlogModel.find() || []

        await ctx.render('index', {
            views: ctx.session.views,
            user: user,
            blogs: blogs
        })
    },
    siteAddBlog: async ctx => {
        let u = ctx.session.u
        if(!u) {
            ctx.redirect('/user/login')
            return
        }
        let user =  u ? await UserModel.findOne({_id: u.uid, username: u.uname}) : null;
        await ctx.render('add', {
            user: user
        })
    },
    siteBlogDetail: async ctx => {
        let {id} = ctx.params
        await BlogModel.increaseView(id)
        let blog = await BlogModel.findBlog(id)
        blog.create_at = formatTime(blog.create_at)

        let u = ctx.session.u
        let user =  u ? await UserModel.findOne({_id: u.uid, username: u.uname}) : null;

        await ctx.render('post', {
            blog: blog,
            user: user
        })
    },
    siteInfoAddPost: async ctx => {
        let {title, content} = ctx.request.body
        let u = ctx.session.u

        await BlogModel.create({
            title: title,
            content: content,
            create_at: +new Date,
            author: u.uname
        })
    
        ctx.redirect('/')
    }
}