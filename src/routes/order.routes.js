const { Router } = require('express')
const { createOrder, getOrders, getCountOrders } = require("../controller/order.controller")
const router = Router()


router.get('/orders', getOrders)
router.get('/orders_count', getCountOrders)
router.post('/orders', createOrder)

module.exports = router
