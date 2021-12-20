const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const model = require('../models/Users')
//const role = require('../models/Role')


route.post('/profile', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, check) => {
        if(err){
            res.json({ wrong: '[!] Wrong Authorization' }).status(501)
        }else{
            model.find({ email: check.email }, (err, done) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    res.json(done)
                }
            })
        }
    })
})

route.post('/register', (req,res) => {
    model.find({ email: req.body.email }, (err, check) => {
        if(err){
            res.json({ error: '[!] Something Wrong in server' }).status(501)
        }else{
            if(check.length > 0){
                res.json({ error: '[!] Email already registered' }).status(301)
            }else{
                bcrypt.hash(req.body.password, 10, (err, pass) => {
                    if(req.query.admin == 'true'){
                        model.insertMany({
                            email: req.body.email,
                            name: req.body.name,
                            password: pass,
                            role: 'admin'
                        }, (err, done) => {
                            if(err){
                                res.json({ error: '[!] Something Wrong in server' }).status(501)
                            }else{
                                res.json({ success: 'Successfully Register' })
                            }
                        })
                    }else{
                        model.insertMany({
                            email: req.body.email,
                            name: req.body.name,
                            password: pass
                        }, (err, done) => {
                            if(err){
                                res.json({ error: '[!] Something Wrong in server' }).status(501)
                            }else{
                                res.json({ success: 'Successfully Register' })
                            }
                        })
                    }
                })
            }
        }
    })
})

route.post('/change/email', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            model.find({ email: req.body.old_email }, (err, users) => {
                if(users.length == 0){
                    res.json({ error: '[!] Users not found !' }).status(301)
                }else{
                    model.updateMany({ email: req.body.old_email, name: token.name }, { $set: { email: req.body.email } }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: 'Successfully change email' })
                        }
                    })
                }
            })
        }
    })
})

route.post('/change/password', (req, res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            model.find({ email: token.email, name: token.name }, (err, users) => {
                bcrypt.hash(req.body.password, 10, (err, pw) => {
                    model.updateMany({ email: token.email, name: token.name }, { $set: { password: pw } }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: 'Successfully change password' })
                        }
                    })
                })
            })
        }
    })
})

route.post('/login', (req,res) => {
    model.find({
        email: req.body.email,
    }, (err, response) => {
        if(err){
            res.json({ error: "[!] Email Doesn't found" }).status(301)
        }else{
            if(!req.body.password){
                res.json({ error: '[!] Username / Password is wrong' }).status(301)
            }else{
                bcrypt.compare(req.body.password == undefined ? '' : req.body.password, response[0].password, (err, done) => {
                    if(err){
                        res.json({ wrong: '[!] Email or password is wrong' }).status(301)
                    }else{
                        const data = jwt.sign({
                            name: response[0].name,
                            email: response[0].email,
                            role: response[0].role,
                            photo: response[0].photo
                        }, process.env.SECRET)
                        res.header({ token: data })
                        res.json({ success: 'Successfully login' })
                    }
                })
            }
        }
    })
});

module.exports = route;
