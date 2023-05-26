const express = require('express')
const router = express.Router()
const userController = require('../Controller/Users')

router.post('/v1/login', userController.userAuthenticate)
module.exports = router
