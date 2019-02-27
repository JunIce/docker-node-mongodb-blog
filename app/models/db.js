const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo:27017/blog',{ useNewUrlParser: true });


module.exports = mongoose