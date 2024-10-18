const { Router } = require('express')
const { createOrder } = require("../controller/order.controller")
const router = Router()

router.post('/orders', createOrder)

module.exports = router
