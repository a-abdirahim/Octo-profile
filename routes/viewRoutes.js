const express = require('express')

const viewsController = require('../controllers/viewController')
const profileController = require('../controllers/profilesController')
const router = express.Router()


router
    .route('/')
    .get(viewsController.getHome)

router.get('/user/:username',profileController.getUserDetails,viewsController.getProfile)

module.exports = router