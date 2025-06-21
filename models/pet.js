const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    breed: { type: String, required: true },
    species: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Available' },
    imageUrl: { type: String, required: true }  // ⭐️ New field for image URL
});

module.exports = mongoose.model('Pet', PetSchema);
