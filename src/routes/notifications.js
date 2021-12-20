const express = require('express')
const route = express.Router()
const modelUsers = require('../models/Users')
const modelNotif = require('../models/Notifications')
const jwt = require('jsonwebtoken')

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email, name: token.name }, (err, users) => {
                if(err || users.length == 0){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelNotif.find({}, (err, done) => {
                        if(err){
                            res.json({ error: "[!] Something wrong in server" }).status(501)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

module.exports = route
