const Router = require('express')
const router = new Router()
const roomRoutes = require('./roomRoutes')
const adminRoutes = require('./adminRoutes')

//router.use('/admin', adminRouter)
router.use('/rooms', roomRoutes)
router.use('/', adminRoutes)
module.exports = router