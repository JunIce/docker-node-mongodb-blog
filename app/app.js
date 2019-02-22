const Koa = require('koa')
const path = require('path')
const app = new Koa
const router = require('./router')
const views = require('koa-views')
const bodyParser = require('koa-body')
const session = require('koa-session')
app.keys = ['newest secret key', 'older secret key'];
app.use(session(app))
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))
app.use(bodyParser())
app.use(router.routes())

app.listen(`2301`, () => {
    console.log(`listening at 2301`)
})