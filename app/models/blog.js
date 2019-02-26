const mongoose = require('./db')
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
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

Blog.increaseView = async (id) => {
    await Blog.findOneAndUpdate({_id: id}, {$inc: { views: 1 }})
}
Blog.findBlog = async (id) => {
    return await Blog.findById(id)
}

module.exports = Blog