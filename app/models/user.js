const mongoose = require('./db')
var color = require('random-color')()
const {generatePassword} = require('../util')
const userSchema = new mongoose.Schema({
    userid: String,
    username: String,
    password: String,
    email: String,
    userpic: {
        type: String,
        default: color.hexString()
    },
    create_at: Number,
    rnd: String
})

const User = mongoose.model('user', userSchema)

User.userExists = async (username) => {
    let u = await User.findOne({username: username})
    return u
}

User.createUser = async (username, password, email) => {
    await User.create({
        email: email,
        username: username,
        password: generatePassword(password),
        create_at: +new Date,
        userpic: color.hexString()
    })
}

module.exports = User