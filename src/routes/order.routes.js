const { Router } = require('express')
const { createOrder,getOrders } = require("../controller/order.controller")
const router = Router()


router.get('/orders', getOrders)
router.post('/orders', createOrder)

module.exports = router
