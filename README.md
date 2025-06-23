# 🐾 Pet Adoption Center - Full Stack Project

This is a **Full Stack Pet Adoption Center** project that allows users to:
- View, search, add, adopt, and delete pets.
- Upload pet images (no need to provide an image URL manually).
- Track pet adoption status.

---

## ⚙️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local), MongoMemoryServer (for tests)
- **ORM**: Mongoose
- **Image Upload**: Multer
- **Testing**: Jest, Supertest, mongodb-memory-server
- **Development Tools**: Nodemon, Cross-Env

## 📂 Project Structure
```plaintext
pet-adoption-api/
├── server.js
├── app.js
├── package.json
├── models/
│   └── Pet.js
├── routes/
│   └── petRoutes.js
├── controllers/
│   └── petController.js
├── uploads/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── api/
│       └── petAPI.test.js
└── README.md

```
---

## 🚀 How to Run the Project Locally
### 📡 Backend Setup
1. Open terminal and navigate to the project root:
   ```plaintext
   cd pet-adoption-api
   ```
2. Install backend dependencies:
   ```plaintext
   npm install
   ```
3. Start the backend server:
   ```plaintext
   npm start
   ```
The backend will run at:
http://localhost:5000
---
### 💻 Frontend Setup
1. Open a new terminal.
2. Navigate to the frontend folder:
   ```plaintext
   cd pet-adoption-frontend
   ```
3. Install frontend dependencies:
   ```plaintext
    npm install
   ```
4. Start the React development server:
   ```pliantext
   npm start
   ```
The frontend will run at:
http://localhost:3000

### Run the tests:
```plaintext
npm test
```

---

## 🧪 Testing Tools
- **Jest**: JavaScript testing framework
- **Supertest**: API endpoint testing
- **mongodb-memory-server**: In-memory MongoDB server for isolated integration tests

---

## 🌐 API Endpoints

| Endpoint       | Method | Description               |
|----------------|--------|---------------------------|
| `/api/pets`    | GET    | Get all pets              |
| `/api/pets/:id`| GET    | Get pet by ID             |
| `/api/pets`    | POST   | Add new pet (image upload) |
| `/api/pets/:id`| PUT    | Update pet status         |
| `/api/pets/:id`| DELETE | Delete pet                |

---

# 📤 Example: Add New Pet (POST)

**URL:** `http://localhost:5000/api/pets`  
**Method:** POST  

### Body Type: `form-data`

#### Fields:
- `name` - Text
- `age` - Text
- `breed` - Text
- `species` - Text
- `description` - Text
- `image` - File (select image from your computer)

---

## ✅ Example Response:
```json
{
  "_id": "unique_pet_id",
  "name": "Bella",
  "age": "3",
  "breed": "Beagle",
  "species": "Dog",
  "description": "Very active and friendly.",
  "imageUrl": "/uploads/image_filename.jpg",
  "status": "Available",
  "__v": 0
}
```
## 🔍 Search & Filter (Frontend)

- Search pets by **name** or **species** using the search bar.
- View only pets that match the search criteria.

---

## 🖼️ Features

- View all pets.
- Search and filter pets.
- Add pets with **image upload**.
- Image preview during pet addition.
- Mark pets as **Adopted**.
- Delete pets.

---

## 📊 Test Coverage Screenshot

### Unit testing
![Image](https://github.com/user-attachments/assets/d4ccc864-f39d-4657-bb9a-337bd59bbaf7)

### Integration testing
![Image](https://github.com/user-attachments/assets/83473489-e1a8-4051-a1fd-f4a7df6a5abf)

### API testing
![Image](https://github.com/user-attachments/assets/fab7dbf7-3178-4bc4-9864-cdcf259a83f2)

## 🔗 API Documentation
Full API documentation and Postman Collection:
👉 [API Docs & Postman Collection](https://bitter-confidence-357.notion.site/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?source=copy_link)

---

## 🔗 Postman Collection

👉 **Postman API Collection Link:**  
https://documenter.getpostman.com/view/45047196/2sB2xBDVve

---

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).



