const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController');

router.post('/search/',roomController.search)
router.get('/all', roomController.getAllRooms)
router.get('/booking/', roomController.booking)
router.get('/end/', roomController.getEndingBooking)


module.exports = router