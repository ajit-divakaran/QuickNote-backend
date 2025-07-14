const express = require('express')
const router = new express.Router()
const userController = require('./controllers/userController')
const noteController = require('./controllers/noteController')
const jwtMiddleware = require('./middlewares/jwtmiddleware')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/add-note',jwtMiddleware,noteController.addnote)
router.post('/edit-note',jwtMiddleware,noteController.editnote)
router.delete('/delete-note/:noteid',jwtMiddleware,noteController.deletenote)

module.exports = router
