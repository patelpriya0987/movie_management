const express = require('express');
const movieController = require('../controllers/movieController');
const upload = require('../config/multerConfig');
const router = express.Router();

router.get('/', movieController.defaultController);
router.get('/add', movieController.getAddMovie);
router.post('/', upload.single('poster'), movieController.postAddMovie);
router.get('/edit/:id', movieController.getEditMovie);
router.post('/update/:id', upload.single('poster'), movieController.postUpdateMovie);
router.get('/delete/:id', movieController.getDeleteMovie);

module.exports = router;
