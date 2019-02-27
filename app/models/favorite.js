const mongoose = require('./db')
const favaSchema = new mongoose.Schema({
    uid: String,
    pid: String,
    create_at: String
})

const Fava = mongoose.model('favorite', favaSchema)

module.exports = {
    findFava: (postId, userId) => {
        return Fava.findOne({uid: userId, pid: postId})
    },
    addPostFava: (postId, userId) => {
        return Fava.create({
            uid: userId,
            pid: postId,
            create_at: +new Date()
        })
    },
    removePostFava: (postId, userId) => {
        return Fava.findOneAndRemove({uid: userId, pid: postId})
    }
}