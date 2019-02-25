const mongoose = require('./db')
var color = require('random-color')()
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
    random: String
})

const User = mongoose.model('user', userSchema)

User.userIsExists = async (username) => {
    let u = await User.findOne({username: username})
    return u
}


module.exports = User