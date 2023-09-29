const Router = require('express')
const { create, getAll, getOne, edit, remove } = require('../controllers/recordsController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router

router.post('/add', authMiddleware,  create)
router.get('/all', authMiddleware, getAll)
router.put('/edit/:id', authMiddleware, edit)
router.delete('/remove/:id', authMiddleware, remove)
router.get('/all/:id', authMiddleware, getOne)

module.exports = router