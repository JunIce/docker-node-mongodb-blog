const Koa = require('koa')
const path = require('path')
const app = new Koa
const routers = require('./routes')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-body')
const session = require('koa-session')


app.keys = ['newest secret key', 'older secret key'];
app.use(session(app))
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))
app.use(static(path.resolve(__dirname, 'static')))
app.use(bodyParser())

app.use(routers())

app.listen(`2301`, () => {
    console.log(`listening at 2301`)
})