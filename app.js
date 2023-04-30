const express = require('express')
const path = require('path')
const fetch = require('node-fetch').default;
const app = express()
// Routes
const profiles = require('./routes/profileRoutes')

app.use(express.static(`${__dirname}/public`))


app.use('/api/v1/', profiles)

module.exports = app