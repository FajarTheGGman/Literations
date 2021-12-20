const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const modelUsers = require('../models/Users');
const modelCategory = require('../models/Category')

route.post('/category', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelCategory.insertMany({ name: req.body.category, description: req.body.desc }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something Wrong in Server' }).status(501)
                        }else{
                            res.json({ success: 'Successfully adding new category' })
                        }
                    })
                }
            })
        }
    })
})

route.post('/status', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: "[!] Users not found !" }).status(301)
                }else{
                    modelUsers.updateMany({ name: token.name, email: token.email }, { $set: { status: req.body.status } },(err, done) => {
                        if(err){
                            res.json({ error: '[!] Something Wrong in server' }).status(501)
                        }else{
                            res.json({ success: 'Successfully updated status' })
                        }
                    })
                }
            })
        }
    })
})

route.post('/change/role', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email, name: token.name }, (err, users) => {
                if(err){
                    res.json({ error: "[!] Users not found" }).status(301)
                }else{
                    modelUsers.updateMany({ email: req.body.email, name: req.body.name }, { $set: { role: req.body.role } }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
                        }else{
                            res.json({ success: 'Successfully change users role' })
                        }
                    })
                }
            })
        }
    })
})

route.post('/list/users/search', (req, res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email, name: token.name }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).statu(301)
                }else{
                    modelUsers.find({ name: req.body.name }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something Wrong in server' }).status(501)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/users', (req, res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email, name: token.name }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelUsers.find({ email: req.body.email, name: req.body.name }, (err, done) => {
                        if(err || done.length == 0){
                            res.json({ error: '[!] Users not found' }).status(301)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/list/users', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email, name: token.name  }, (err, users) => {
                if(err || users.length == 0){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelUsers.find({}, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(501)
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
