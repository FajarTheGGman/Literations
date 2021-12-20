const mongoose = require('mongoose')

const Likes = mongoose.Schema({
    name: { type: String, default: null },
})

const Books = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    cover: { type: String },
    file: { type: String },
    category: { type: String },
    creator: { type: String },
    likes: [Likes]
}, { collections: 'books', timestamps: true })

module.exports = mongoose.model('books', Books)
