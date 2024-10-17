const { Router } = require('express')
const { register, login, logout, authenticateToken } = require('../controller/auth.controller')

const router = Router()


router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

/* router.get('/check_session', authenticateToken) */
router.get('/check_session', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Session is valid', user: req.user });
});


module.exports = router