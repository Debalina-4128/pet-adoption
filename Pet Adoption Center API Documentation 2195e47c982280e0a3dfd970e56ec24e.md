# Pet Adoption Center API Documentation

---

## 📚 Introduction

Welcome to the **Pet Adoption Center API**.

This API allows you to manage pets available for adoption, including adding, viewing, updating, and deleting pet records.

The API supports **image uploads** so you can attach pet images directly.

---

## 📑 Table of Contents

- [API Overview](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [API Endpoints](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [Request & Response Examples](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [Database Structure](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [How to Run the Backend](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [How to Run the Frontend](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [Postman Collection](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)
- [Sample Images](https://www.notion.so/Pet-Adoption-Center-API-Documentation-2195e47c982280e0a3dfd970e56ec24e?pvs=21)

---

## 🚀 API Overview

- **Backend:** Node.js, Express.js, MongoDB
- **Image Uploads:** Multer
- **Frontend:** React.js (Optional)
- **API Type:** REST

---

## 🛠️ API Endpoints

| Method | Endpoint | Description | Request Type |
| --- | --- | --- | --- |
| GET | `/api/pets` | Fetch all pets | - |
| GET | `/api/pets/:id` | Fetch a pet by ID | - |
| POST | `/api/pets` | Add a new pet (with image) | `multipart/form-data` |
| PUT | `/api/pets/:id` | Update pet status | `application/json` |
| DELETE | `/api/pets/:id` | Delete a pet | - |

---

## 📨 Request & Response Examples

### ➕ Add New Pet (POST)

**Endpoint:** `http://localhost:5000/api/pets`

**Request Type:** `multipart/form-data`

**Body:**

- name: *string*
- age: *number*
- breed: *string*
- species: *string*
- description: *string*
- image: *file* (Upload pet image)

**Sample Success Response:**

```json
{
    "_id": "665f3b77e548cb3eec24487a",
    "name": "Bella",
    "age": 3,
    "breed": "Beagle",
    "species": "Dog",
    "description": "Very active and friendly.",
    "imageUrl": "/uploads/bella.jpg",
    "status": "Available"
}
```

---

### ✅ Update Pet Status (PUT)

**Endpoint:** `http://localhost:5000/api/pets/:id`

**Request Type:** `application/json`

**Body:**

```json
{
    "status": "Adopted"
}
```

---

### 🗑️ Delete Pet (DELETE)

**Endpoint:** `http://localhost:5000/api/pets/:id`

**Response:**

```json
{
    "message": "Pet deleted successfully"
}
```

---

## 🗂️ Database Structure

### Pet Schema:

```json
{
    "name": "string",
    "age": "number",
    "breed": "string",
    "species": "string",
    "description": "string",
    "imageUrl": "string",
    "status": "string" (default: "Available")
}
```

---

## ⚙️ How to Run the Backend

1. Clone the repository.
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the MongoDB server.
4. Run the backend:
    
    ```bash
    npm start
    ```
    
5. Server runs on:`http://localhost:5000`

---

## 💻 How to Run the Frontend

1. Navigate to the frontend folder:
    
    ```bash
    cd pet-adoption-frontend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    
3. Start the React app:
    
    ```bash
    npm start
    ```
    
4. App runs on:`http://localhost:3000`

---

## 📂 Postman Collection

Here's the collection you can import to Postman:

[Postman Collection Link](https://documenter.getpostman.com/view/45047196/2sB2xBDVve)

---

## 🖼️ Sample Images

- All uploaded images are stored in the `uploads` folder.
- Image URLs can be accessed via:`http://localhost:5000/uploads/<image-name>`

---

## ✅ Notes

- Ensure the `uploads` folder exists.
- Ensure MongoDB is running locally.