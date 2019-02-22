const mongoose = require('./db')
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    create_at: String,
    update_at: String,
    views: {
        type: Number,
        default: 0
    },
    likeNum: {
        type: Number,
        default: 0
    },
    favoriteNum: {
        type: Number,
        default: 0
    }
})

const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog