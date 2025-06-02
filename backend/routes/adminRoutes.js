const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController');
const { checkAuth } = require('../controllers/checkAuth');

router.post('/booking/create', adminController.createBooking)
router.post('/payment/create', adminController.createPayment)
router.post('/booking/confirmed', adminController.setConfirmed)
router.post('/request/', adminController.request)
router.get('/request/', adminController.getRequests)

router.post('/login', adminController.login)
router.get('/users', adminController.getAllUsers)
router.post('/reg', adminController.registration)
router.get('/auth/me',checkAuth, adminController.getMe)

module.exports = router