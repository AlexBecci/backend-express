const { Router } = require('express')
const { getDishesByMenuDate ,getMenuByDate,createtDayMenu} = require('../controller/dailyMenu.controller')

const router = Router()

//crear menu fecha
router.get('/daily_menus', getDishesByMenuDate)

router.get('/daily_menus/auth', getMenuByDate)

router.post('/daily_menus', createtDayMenu)


module.exports = router
