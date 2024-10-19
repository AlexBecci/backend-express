const { Router } = require('express')
const { getDishesByMenuDate } = require('../controller/dailyMenu.controller')

const router = Router()

//crear menu fecha
router.get('/daily_menus', getDishesByMenuDate)

module.exports = router
