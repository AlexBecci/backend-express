const { Router } = require('express')
const { createDishesByMenuDate } = require('../controller/dailyMenuDishes.controller')

const router = Router()

//crear menu fecha
router.post('/daily_menus/dishes', createDishesByMenuDate)

/* router.get('/daily_menus/dishes/auth', getMenuByDate) */


module.exports = router
