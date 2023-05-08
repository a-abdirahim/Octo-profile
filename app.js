const express = require('express')
const path = require('path')
// const fetch = require('node-fetch').default;
const cache = require('memory-cache');

const app = express()
// Routes
const profiles = require('./routes/profileRoutes')
const views = require('./routes/viewRoutes')

app.use(express.static(`${__dirname}/public`))
app.use(express.static('css'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use('/', views)

app.use('/api/v1/', profiles)

module.exports = app