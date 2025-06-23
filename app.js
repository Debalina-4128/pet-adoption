const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const petRoutes = require('./routes/petRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/api', petRoutes);
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

mongoose.set('strictQuery', true);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petAdoption';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
