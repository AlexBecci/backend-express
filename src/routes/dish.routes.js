const { Router } = require('express')
const { createDish } = require('../controller/dish.controller')

const router = Router()

router.post('/dishes', createDish)

module.exports = router
