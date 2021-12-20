const mongoose = require('mongoose')

const Later = mongoose.Schema({
    title: { type: String },
    cover: { type: String },
    category: { type: String }
})

const Users = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    photo: { type: String, default: 'users.png' },
    role: { type: String, default: 'users' },
    acvitiy: { type: String },
    verified: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
    readlater: [Later],
}, { collections: 'users', timestamps: true })

module.exports = mongoose.model('Users', Users)
