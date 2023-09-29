const Router = require('express')
const recordsRouter = require('./recordsRouter')
const userRouter = require('./userRouter') 

const router = new Router

router.use('/user', userRouter)
router.use('/records', recordsRouter)

module.exports = router