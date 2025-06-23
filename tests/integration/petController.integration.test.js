
const { connect, closeDatabase, clearDatabase } = require('../setupTestDB');
const Pet = require('../../models/Pet');
const petController = require('../../controllers/petController');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('Pet Controller Integration Tests (Real Database)', () => {

    test('should add a pet successfully', async () => {
        const req = {
            body: {
                name: 'Rocky',
                age: 4,
                breed: 'Bulldog',
                species: 'Dog',
                description: 'Friendly dog'
            },
            file: { filename: 'test.jpg' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await petController.addPet(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();

        const pets = await Pet.find();
        expect(pets.length).toBe(1);
        expect(pets[0].name).toBe('Rocky');
    });

    test('should fetch all pets', async () => {
        // Add pets directly to the database
        await Pet.create([
            { name: 'Tommy', age: 2, breed: 'Beagle', species: 'Dog', description: 'Cute dog', imageUrl: '/uploads/test.jpg' },
            { name: 'Bella', age: 1, breed: 'Labrador', species: 'Dog', description: 'Playful', imageUrl: '/uploads/test.jpg' }
        ]);

        const req = {};
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await petController.getAllPets(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(res.json.mock.calls[0][0].length).toBe(2);
    });

    test('should return 404 when pet not found', async () => {
        const req = { params: { id: '507f191e810c19729de860ea' } }; // Some random ObjectId
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await petController.getPetById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Pet not found' });
    });

    test('should update a pet successfully', async () => {
        const pet = await Pet.create({
            name: 'Lucy',
            age: 3,
            breed: 'Poodle',
            species: 'Dog',
            description: 'Calm dog',
            imageUrl: '/uploads/test.jpg'
        });

        const req = { params: { id: pet._id }, body: { status: 'Adopted' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await petController.updatePet(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ status: 'Adopted' }));

        const updatedPet = await Pet.findById(pet._id);
        expect(updatedPet.status).toBe('Adopted');
    });

    test('should delete a pet successfully', async () => {
        const pet = await Pet.create({
            name: 'Max',
            age: 2,
            breed: 'Golden Retriever',
            species: 'Dog',
            description: 'Friendly dog',
            imageUrl: '/uploads/test.jpg'
        });

        const req = { params: { id: pet._id } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await petController.deletePet(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Pet deleted successfully' });

        const deletedPet = await Pet.findById(pet._id);
        expect(deletedPet).toBeNull();
    });

});
