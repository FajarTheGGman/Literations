const mongoose = require('mongoose')

const Role = mongoose.Schema({
    name: { type: String },
    level: { type: String }
}, { collections: 'role' })


module.exports = mongoose.model('Role', Role);
