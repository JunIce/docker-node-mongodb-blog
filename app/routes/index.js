const Router = require('koa-router')
const path = require('path')
let BlogModel = require(path.resolve(__dirname, '../models/blog'))

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
    console.log(id)
    let blog = await BlogModel.findById( id)

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



module.exports = router