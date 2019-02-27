const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))
let UserModel = require(path.resolve(__dirname, '../models/user'))
let FavaModel = require(path.resolve(__dirname, '../models/favorite'))

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

        if(u) { // 用户登录的情况下
            let fava = await FavaModel.findFava(blog.id, user.id)
            blog.userFava = fava ? 1 : 0; // 有记录即已经点赞
        }

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
    },
    postFavaAction: async ctx => {
        let {postId} = ctx.request.body

        if(!ctx.session.u) { // 未登录状态下
            ctx.body = {
                status: 400,
                message: '请先登录'
            }
            return
        }

        let blog = await BlogModel.findOne({_id: postId})
        // 信息不存在的情况下
        if(!blog) {
            ctx.body = {
                status: 400,
                message: '信息不存在或已删除'
            }
            return
        }

        let uid = ctx.session.u.uid

        let favalog = await FavaModel.findFava(postId, uid)
        favalog == null ? await FavaModel.addPostFava(postId, uid) : await FavaModel.removePostFava(postId, uid)
        ctx.body = {
            data: favalog == null ? 0 : 1,
            status : 200,
            message: '操作成功'
        }
    }
}