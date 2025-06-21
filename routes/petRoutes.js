const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const petController = require('../controllers/petController');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets', upload.single('image'), petController.addPet);
router.put('/pets/:id', petController.updatePet);
router.delete('/pets/:id', petController.deletePet);

module.exports = router;
