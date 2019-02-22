const mongoose = require('./db')
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    date: String
})

const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog