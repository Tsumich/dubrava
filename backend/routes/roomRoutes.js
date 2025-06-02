const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController');
const multer = require('multer');
const { checkAuth } = require('../controllers/checkAuth');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'static');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
   filename: (req, file, cb) => {
    cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/search/',roomController.search)
router.get('/all', roomController.getAllRooms)
router.get('/booking/', roomController.booking)
router.get('/end/', roomController.getEndingBooking)
router.post('/edit/image', roomController.editImageInfo)
router.post('/upload/image', upload.single('image'),roomController.changeRoomImageName);
router.post('/price/', checkAuth, roomController.setPrice)

module.exports = router