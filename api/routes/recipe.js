const { Router } = require('express')
const config = require('../config')
const recipeController = require('../controllers/recipeController')

const router = Router()

router.get('/recipe', recipeController.list)
router.get('/recipe/own', config.isAuthenticated, recipeController.own)
router.get('/recipe/:id', recipeController.show)
router.post('/recipe', config.isAuthenticated, recipeController.create)
// router.put('/recipe/:id', config.isAuthenticated, recipeController.update)
router.delete('/recipe/:id', config.isAuthenticated, recipeController.delete)

module.exports = router
