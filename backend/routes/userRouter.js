const Router = require('express')
const { registration, login, current, getUserRole } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router

router.post('/registration', registration)
router.post('/login', login)
router.get('/current', authMiddleware, current)
router.get('/role', authMiddleware, getUserRole)

module.exports = router