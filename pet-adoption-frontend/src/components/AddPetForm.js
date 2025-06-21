import React, { useState } from 'react';
import axios from 'axios';

const AddPetForm = ({ onPetAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        breed: '',
        species: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('breed', formData.breed);
        formDataToSend.append('species', formData.species);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', imageFile);

        await axios.post('http://localhost:5000/api/pets', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setFormData({ name: '', age: '', breed: '', species: '', description: '' });
        setImageFile(null);
        setImagePreview('');
        onPetAdded();
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Add a New Pet</h2>
            <form onSubmit={handleSubmit} className="pet-form">
                <div className="input-group">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="input-field" />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="input-field" />
                    <input type="text" name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} required className="input-field" />
                    <input type="text" name="species" placeholder="Species" value={formData.species} onChange={handleChange} required className="input-field" />
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} required className="input-field" />
                </div>

                {imagePreview && (
                    <div className="image-preview">
                        <p className="preview-label">Image Preview:</p>
                        <img src={imagePreview} alt="Preview" className="preview-image" />
                    </div>
                )}

                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="textarea-field" />

                <button type="submit" className="submit-button">Add Pet</button>
            </form>
        </div>
    );
};

export default AddPetForm;
