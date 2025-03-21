const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController');
const multer = require('multer');
const { checkAuth } = require('../controllers/checkAuth');

// upload picture
// const storage = multer.diskStorage({ // создали хранилище
//     destination: (_, __, cb) => {
//         cb(null, 'static')
//     },
//     filename: (_, file, cb) => {
//         cb(null, file.originalname);
//     }	
// })
// const upload = multer({	storage })


// const editRoomInfo = (req, res) => {
 
//     const originalName = '/static/' + req.file.originalname
//     res.json({
//         url: originalName,
//     })
// }


router.post('/search/',roomController.search)
router.get('/all', roomController.getAllRooms)
router.get('/booking/', roomController.booking)
router.get('/end/', roomController.getEndingBooking)
router.post('/price/', checkAuth, roomController.setPrice)
//router.post('/edit/room/:id',  checkAuth, upload.single('image'),editRoomInfo)

module.exports = router