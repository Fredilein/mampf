const { Router } = require('express')
const config = require('../config')
const userController = require('../controllers/userController')

const router = Router()

// Initialize Controller

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/me', userController.user)

module.exports = router
