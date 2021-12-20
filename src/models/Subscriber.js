const { Sequelize, Models, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USERS, process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const Subscriber = sequelize.define('subscriber', {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    subscribe: DataTypes.BOOLEAN,
    expired: DataTypes.TEXT
})

Subscriber.sync()

module.exports = Subscriber
