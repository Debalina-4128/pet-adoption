const Pet = require('../models/Pet');

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pets', error: err.message });
    }
};

// Get pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pet', error: err.message });
    }
};

// Add new pet (with image upload)
exports.addPet = async (req, res) => {
    try {
        const { name, age, breed, species, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        // Basic validation
        if (!name || !age || !breed || !species || !description || !req.file) {
            return res.status(400).json({ message: 'Please provide all required fields including an image.' });
        }

        const newPet = new Pet({
            name,
            age,
            breed,
            species,
            description,
            imageUrl
        });

        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (err) {
        res.status(500).json({ message: 'Error adding pet', error: err.message });
    }
};

// Update pet (status or other fields)
exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json(updatedPet);
    } catch (err) {
        res.status(500).json({ message: 'Error updating pet', error: err.message });
    }
};

// Delete pet
exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);

        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting pet', error: err.message });
    }
};
