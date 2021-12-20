const mongoose = require('mongoose')

const Notif = mongoose.Schema({
    title: { type: String },
    desc: { type: String },
    icons: { type: String },
    from: { type: String },
    books: { type: String, default: null }
}, { timestamps: true })

module.exports = mongoose.model('Notifications', Notif)
