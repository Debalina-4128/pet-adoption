const petController = require('../../controllers/petController');
const Pet = require('../../models/Pet');

// Mock the Pet model
jest.mock('../../models/Pet');

describe('Pet Controller - Unit Tests (Mocked DB)', () => {

    describe('getAllPets', () => {
        it('should return all pets', async () => {
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockPets = [{ name: 'Tommy' }, { name: 'Bella' }];
            Pet.find.mockResolvedValue(mockPets);

            await petController.getAllPets(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPets);
        });
    });


    describe('getPetById', () => {
        it('should return a pet if found', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findById.mockResolvedValue({ name: 'Tommy' });

            await petController.getPetById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ name: 'Tommy' });
        });

        it('should return 404 if pet not found', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findById.mockResolvedValue(null);

            await petController.getPetById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pet not found' });
        });
    });

    describe('addPet', () => {
        it('should return 400 if required fields are missing', async () => {
            const req = { body: {}, file: null };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await petController.addPet(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Please provide all required fields including an image.' });
        });

        it('should add a new pet successfully', async () => {
            const req = {
                body: { name: 'Tommy', age: 3, breed: 'Beagle', species: 'Dog', description: 'Friendly' },
                file: { filename: 'test.jpg' }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.prototype.save = jest.fn().mockResolvedValue({ ...req.body, imageUrl: '/uploads/test.jpg' });

            await petController.addPet(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Tommy' }));
        });
    });

    describe('updatePet', () => {
        it('should update a pet successfully', async () => {
            const req = { params: { id: '123' }, body: { status: 'Adopted' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findByIdAndUpdate.mockResolvedValue({ _id: '123', status: 'Adopted' });

            await petController.updatePet(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ _id: '123', status: 'Adopted' });
        });

        it('should return 404 if pet not found for update', async () => {
            const req = { params: { id: '123' }, body: { status: 'Adopted' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findByIdAndUpdate.mockResolvedValue(null);

            await petController.updatePet(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pet not found' });
        });
    });

    describe('deletePet', () => {
        it('should delete a pet successfully', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findByIdAndDelete.mockResolvedValue({ _id: '123' });

            await petController.deletePet(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pet deleted successfully' });
        });

        it('should return 404 if pet not found for deletion', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Pet.findByIdAndDelete.mockResolvedValue(null);

            await petController.deletePet(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Pet not found' });
        });
    });

});
