import React from 'react';
import axios from 'axios';


const PetCard = ({ pet, onPetUpdated }) => {
    const handleAdopt = async () => {
        await axios.put(`http://localhost:5000/api/pets/${pet._id}`, { status: 'Adopted' });
        onPetUpdated();
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/api/pets/${pet._id}`);
        onPetUpdated();
    };

    return (
        <div className="pet-card">
            <div>
                {/* Display the pet image */}
                <img
                    src={`http://localhost:5000${pet.imageUrl}`}
                    alt={pet.name}
                    className="pet-image"
                />

                <h2 className="pet-name">{pet.name}</h2>
                <p className="pet-info">Species: {pet.species}</p>
                <p className="pet-info">Breed: {pet.breed}</p>
                <p className="pet-info">Age: {pet.age}</p>
                <p className="pet-status">
                    Status: <span className={pet.status === 'Available' ? 'status-available' : 'status-adopted'}>
                        {pet.status}
                    </span>
                </p>
                <p className="pet-description">{pet.description}</p>
            </div>

            <div className="button-group">
                {pet.status === 'Available' && (
                    <button
                        onClick={handleAdopt}
                        className="adopt-button"
                    >
                        Adopt
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className="delete-button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PetCard;
