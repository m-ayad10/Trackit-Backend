
# Backend - MERN Stack Application

This is the backend of the MERN stack application, built using **Node.js**, **Express.js**, and **MongoDB**.

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cookie Parser
- CORS

---

## 🛠️ Installation

1. **Navigate to the backend folder**:
   cd backend
   

2. **Install dependencies**:
   npm install

## 🚀 Running the Backend (Development)
nodemon server.js or node server.js


Backend runs on as specified in `.env`


## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory:


PORT=5000
MONGO_URI=mongodb://localhost:27017/mydatabase
JWT_SECRET_KEY=your_jwt_secret_key

---

## 🧠 Key Middleware

- `cookie-parser` for handling HTTP-only cookies
- `cors` for cross-origin requests:
  js
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
     methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
 

