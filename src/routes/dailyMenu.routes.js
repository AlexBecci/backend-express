const { Router } = require('express')
const { getDishesByMenuDate ,getMenuByDate} = require('../controller/dailyMenu.controller')

const router = Router()

//crear menu fecha
router.get('/daily_menus', getDishesByMenuDate)

router.get('/daily_menus/auth', getMenuByDate)


module.exports = router
