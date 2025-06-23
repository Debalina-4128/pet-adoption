
const { connect, closeDatabase, clearDatabase } = require('../setupTestDB');
const Pet = require('../../models/Pet');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Database Integration Test - Pet Model CRUD Operations', () => {

    it('should create a pet successfully', async () => {
        const petData = { name: 'Tommy', age: 3, breed: 'Beagle', species: 'Dog', description: 'Friendly', imageUrl: '/uploads/test.jpg' };

        const pet = await Pet.create(petData);

        expect(pet.name).toBe('Tommy');
        expect(pet.age).toBe(3);
        expect(pet.species).toBe('Dog');
    });

    it('should read/find a pet by ID', async () => {
        const petData = { name: 'Bella', age: 2, breed: 'Pug', species: 'Dog', description: 'Cute', imageUrl: '/uploads/bella.jpg' };
        const createdPet = await Pet.create(petData);

        const foundPet = await Pet.findById(createdPet._id);

        expect(foundPet).not.toBeNull();
        expect(foundPet.name).toBe('Bella');
    });

    it('should update a pet successfully', async () => {
        const petData = { name: 'Rocky', age: 4, breed: 'Bulldog', species: 'Dog', description: 'Calm', imageUrl: '/uploads/rocky.jpg' };
        const pet = await Pet.create(petData);

        const updatedPet = await Pet.findByIdAndUpdate(pet._id, { status: 'Adopted' }, { new: true });

        expect(updatedPet.status).toBe('Adopted');
    });

    it('should delete a pet successfully', async () => {
        const petData = { name: 'Luna', age: 1, breed: 'Persian Cat', species: 'Cat', description: 'Playful', imageUrl: '/uploads/luna.jpg' };
        const pet = await Pet.create(petData);

        await Pet.findByIdAndDelete(pet._id);

        const deletedPet = await Pet.findById(pet._id);
        expect(deletedPet).toBeNull();
    });

});
