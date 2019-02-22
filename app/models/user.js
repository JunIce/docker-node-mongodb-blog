const mongoose = require('./db')
const userSchema = new mongoose.Schema({
    userid: String,
    username: String,
    create_at: String,
    random: String
})

const User = mongoose.model('user', userSchema)
module.exports = User