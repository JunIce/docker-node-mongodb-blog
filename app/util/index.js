const md5 = require('md5')

let generatePassword = function(password) {
    return md5(`${password}_uuid_uuid`) || ''
}

exports.formatTime = function(t) {
    console.log(t)
    let date = new Date(parseInt(t))
    return `${date.getMonth() + 1}月${date.getDate()}日`
}

exports.generatePassword = generatePassword

exports.checkPassword = function(pass, originPass) {
    return generatePassword(pass) == originPass
}

exports.generateToken = (uid, uname, rnd) => {
    return md5(`${uid}${uname}${rnd}`)
}