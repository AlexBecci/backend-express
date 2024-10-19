const { Router } = require('express')
const { createDish, getDishes } = require('../controller/dish.controller')

const router = Router()

router.get('/dishes', getDishes)
router.post('/dishes', createDish)

module.exports = router
