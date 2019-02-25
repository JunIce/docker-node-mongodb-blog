const Router = require('koa-router')
const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))
let UserModel = require(path.resolve(__dirname, '../models/user'))
const {formatTime, generatePassword} = require('../util')

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


module.exports = router