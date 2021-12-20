const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const file = require('express-fileupload')
const mongoose = require('mongoose')
const colors = require('colors')

require('dotenv').config();

const routeAuth = require('./routes/auth')
const routeBook = require('./routes/books')
const routeAdmin = require('./routes/admin')
const routeNotif = require('./routes/notifications')

const middlewares = require('./middlewares');
const api = require('./api');

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true
}).catch(err => {
    console.log(colors.red('[!] Error Connecting to database'))
})

const app = express();

app.use(file())
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use('/auth', routeAuth)
app.use('/book', routeBook)
app.use('/admin', routeAdmin)
app.use('/notif', routeNotif)

app.get('/', (req, res) => {
  res.json({
      project: 'Literations',
      version: 'v1.0.0'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
