const Router = require('koa-router')
const path = require('path')
const md5 = require('md5')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))
let UserModel = require(path.resolve(__dirname, '../models/user'))
const {formatTime} = require('../util')

let router = new Router

router.get('/', async (ctx) => {
    
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
})

router.get('/add', async ctx => {
    await ctx.render('add')
})

router.get('/login', async (ctx) => {
    await ctx.render('login')
})

router.get('/post/:id', async ctx => {
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
})

router.get('/logout', ctx => {
    ctx.session.islogin = null
    ctx.redirect('/')
})

router.post('/action/login', async (ctx) => {
    let {username, password} = ctx.request.body
    ctx.session.islogin = true
    ctx.cookies.set('username', username)
    ctx.redirect('/')
})

router.post('/sub-post', async (ctx) => {
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
})

router.post('/user/register', async(ctx) => {
    let { email, username, password} = ctx.request.body

    let isExists = await UserModel.userIsExists(username)
    console.log(isExists)
    if(isExists) {
        ctx.body = {
            data: '用户已存在'
        }
    }

    // await UserModel.create({
    //     email: email,
    //     username: username,
    //     password: md5(`${password}_uuid_uuid`)
    // })


    console.log(await UserModel.find())
})



module.exports = router