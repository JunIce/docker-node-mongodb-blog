const Koa = require('koa')
const path = require('path')
const app = new Koa
const routers = require('./routes')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-body')
const session = require('koa-session')


app.keys = ['newest secret key', 'older secret key'];
const CONFIG = {
    key: 'blog:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };
app.use(session(CONFIG, app))
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))
app.use(static(path.resolve(__dirname, 'static')))
app.use(bodyParser())

app.use(routers())

app.listen(`2301`, () => {
    console.log(`listening at 2301`)
})