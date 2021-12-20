const mongoose = require('mongoose')

const Category = mongoose.Schema({
    name: { type: String },
    description: { type: String },
}, { collections: 'category', timestamps: true })

module.exports = mongoose.model('category', Category)
