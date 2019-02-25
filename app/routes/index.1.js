
const {formatTime, generatePassword} = require('../util')


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