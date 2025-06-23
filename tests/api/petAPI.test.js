

const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Pet = require('../../models/Pet');

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

  
    process.env.MONGO_URI = uri;

    await mongoose.connect(uri, {});

    app = require('../../app');
});

afterEach(async () => {
    await Pet.deleteMany(); 
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

describe('Pet API Endpoints', () => {
    let petId;

    it('should create a new pet (POST /api/pets)', async () => {
        const response = await request(app)
            .post('/api/pets')
            .field('name', 'Tommy')
            .field('age', 3)
            .field('breed', 'Beagle')
            .field('species', 'Dog')
            .field('description', 'Friendly dog')
            .attach('image', Buffer.from(''), 'test.jpg');

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Tommy');
        petId = response.body._id;
    });

    it('should get all pets (GET /api/pets)', async () => {
        const response = await request(app).get('/api/pets');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a pet by ID (GET /api/pets/:id)', async () => {
        const pet = await Pet.create({
            name: 'Luna',
            age: 2,
            breed: 'Labrador',
            species: 'Dog',
            description: 'Calm and friendly',
            imageUrl: '/uploads/test.jpg'
        });

        const response = await request(app).get(`/api/pets/${pet._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Luna');
    });

    it('should update a pet status (PUT /api/pets/:id)', async () => {
        const pet = await Pet.create({
            name: 'Luna',
            age: 2,
            breed: 'Labrador',
            species: 'Dog',
            description: 'Calm and friendly',
            imageUrl: '/uploads/test.jpg'
        });

        const response = await request(app)
            .put(`/api/pets/${pet._id}`)
            .send({ status: 'Adopted' });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('Adopted');
    });

    it('should delete a pet (DELETE /api/pets/:id)', async () => {
        const pet = await Pet.create({
            name: 'Luna',
            age: 2,
            breed: 'Labrador',
            species: 'Dog',
            description: 'Calm and friendly',
            imageUrl: '/uploads/test.jpg'
        });

        const response = await request(app).delete(`/api/pets/${pet._id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Pet deleted successfully');
    });
});
