import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from './PetCard';
import AddPetForm from './AddPetForm';


const PetList = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');

    const fetchPets = async () => {
        const response = await axios.get('http://localhost:5000/api/pets');
        setPets(response.data);
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSpeciesFilter('');
    };

    // Filter pets based on search and species
    const filteredPets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (speciesFilter === '' || pet.species === speciesFilter)
    );

    return (
        <div className="pet-list-container">
            <h1 className="pet-list-title">🐾 Pet Adoption Center 🐾</h1>

            {/* Add Pet Form */}
            <AddPetForm onPetAdded={fetchPets} />

            {/* Search and Filter */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="filter-input"
                />

                <select
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                    className="filter-input"
                >
                    <option value="">All Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                </select>

                <button onClick={handleResetFilters} className="reset-button">
                    Reset Filters
                </button>
            </div>

            {/* Pet Cards */}
            <div className="pet-card-grid">
                {filteredPets.length > 0 ? (
                    filteredPets.map((pet) => (
                        <PetCard key={pet._id} pet={pet} onPetUpdated={fetchPets} />
                    ))
                ) : (
                    <p className="no-pets-message">No pets found.</p>
                )}
            </div>
        </div>
    );
};

export default PetList;
