const express = require('express')
const route = express.Router();
const jwt = require('jsonwebtoken')
const modelUsers = require('../models/Users')
const modelBooks = require('../models/Books')
const modelNotif = require('../models/Notifications')
const fs = require('fs')

route.post('/getall', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, check) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: check.email }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({}, (err, done) => {
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

route.post('/get', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ name: token.name, email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({ title: req.body.title }, (err, done) => {
                        if(done.length == 0 || done.length == null){
                            res.json({ not_found: 'Books not found' }).status(301)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/most-updated', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ emai: token.email }, (err, ser) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({}).sort({ createdAt: 'asc' }).exec((err, done) => {
                        res.json(done)
                    })
                }
            })
        }
    })
})

route.post('/most-liked', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email }, (err, user) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({}).sort({ likes: 'DESC' }).exec((err, done) => {
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

route.post('/category', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({ category: req.body.category }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something Wrong in Server' }).status(501)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/search', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    modelBooks.find({ title: { $regex: req.body.title } }, (err, done) => {
                        if(err){
                            res.json({ error: '[!] Something wrong in server' }).status(301)
                        }else{
                            res.json(done)
                        }
                    })
                }
            })
        }
    })
})

route.post('/testing', (req,res) => {
    console.log(req.files)
    req.files.buku.mv('public/books/' + req.files.buku.name, (err, done) => {
        if(err){
            res.send(err)
        }else{
            res.json({ done: 'done' })
        }
    })
})

route.post('/add', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.find({ name: token.name, email: token.email }, (err, users) => {
                if(err){
                    res.json({ error: '[!] Users not found' }).status(301)
                }else{
                    req.files.buku.mv('public/books/' + req.files.buku.name, (err, buku) => {
                        if(err){
                            res.json({ error: '[!] failed uploading file' }).status(501)
                        }else{
                            req.files.cover.mv('public/books_cover/' + req.files.cover.name, (err, cover) => {
                                if(err){
                                    res.json({ error: '[!] failed uploading file' }).status(501)
                                }else{
                                    modelBooks.insertMany({
                                        title: req.body.title,
                                        description: req.body.description,
                                        cover: req.headers.host + '/books_cover/' + req.files.cover.name,
                                        category: req.body.category,
                                        file: req.headers.host + '/books/' + req.files.buku.name,
                                        creator: token.name
                                    }, (err, done) => {
                                        if(err){
                                            res.json({ error: '[!] Something wrong in server' }).status(301)
                                        }else{
                                            modelNotif.insertMany({
                                                title: req.body.title,
                                                desc: "a new book " + req.body.title + ' has uploaded',
                                                icons: null,
                                                from: token.name,
                                                books: req.body.title
                                            }, (err, ok) => {
                                                if(err){
                                                    res.json({ error: '[!] Something wrong in server' }).status(501)
                                                }else{
                                                    res.json({ success: 'Successfully uploading books'})
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })

                }
            })
        }
    })
})
/*
route.post('/delete', (req,res) => {
    jwt.verify(req.body.token, req.body.secret, (err, token) => {
        if(err){
            res.json({ error: '[!] Wrong Authorization' }).status(301)
        }else{
            modelUsers.findAll({
                where:{
                    email: token.email,
                    name: token.name
                }
            }).then((user) => {
                if(user.length != 0){
                    modelBooks.findAll({
                        where: {
                            title: req.body.title
                        }
                    }).then((data) => {
                        if(data.length != 0){
                            fs.unlink('./' + data[0].dataValues.file, (err, done) => {
                                if(err){
                                    res.json({ error: '[!] Error Deleting file' }).status(501)
                                }else{
                                    modelBooks.destroy({
                                        where: {
                                            title: req.body.title
                                        }
                                    }).then((result) => {
                                        res.json({ success: 'Successfully delete books' })
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})
*/

module.exports = route
