const express = require('express')
const userController = require('./controllers/userController')
const router = new express.Router()

router.get('/register',userController.register)

module.exports = router
