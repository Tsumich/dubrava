const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController');

router.post('/search/',roomController.search)
router.get('/all', roomController.getAllRooms)
router.get('/booking/', roomController.booking)
router.get('/end/', roomController.getEndingBooking)
//router.post('/booking/create', adminController.createBooking)
//router.post('/payment/create', adminController.createPayment)


module.exports = router