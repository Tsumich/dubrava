const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController');

router.post('/booking/create', adminController.createBooking)
router.post('/payment/create', adminController.createPayment)


module.exports = router