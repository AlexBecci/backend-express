const { Router } = require('express')
const { getUsers, getUser } = require('../controller/user.controller')

const router = Router()

router.get('/users', getUsers)
router.get('/user', getUser)
module.exports = router
