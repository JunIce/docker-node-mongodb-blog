const Koa = require('koa')
const path = require('path')
const app = new Koa
const router = require('./routes')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-body')
const session = require('koa-session')


app.keys = ['newest secret key', 'older secret key'];
app.use(session(app))
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))
app.use(static(path.resolve(__dirname, 'static')))
app.use(bodyParser())

app.use(async (ctx, next) => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    console.log(`views is ${n}`)
    await next()
    console.log(`finish`)
})


app.use(router.routes())
app.use(router.allowedMethods())



app.listen(`2301`, () => {
    console.log(`listening at 2301`)
})