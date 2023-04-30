const express = require('express')

const router = express.Router()
const profileController = require('../controllers/profilesController')

router.
    route('/users/:username')
    .get( profileController.getUserDetails)

module.exports = router