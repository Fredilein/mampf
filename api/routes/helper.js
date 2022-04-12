const { Router } = require('express')
const helperController = require('../controllers/helperController')

const router = Router()

router.post('/helper/preview', helperController.preview)

module.exports = router
