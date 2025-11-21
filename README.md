🚀 Task Management App

A full-stack MERN application with User Authentication, Role-Based Access, and Task CRUD APIs, built for the Insight Global Internship assessment.

📌 Features

User registration & login (JWT Authentication)

Role-based access (User & Admin)

Create, read, delete tasks

Each task assigned to its owner

Only admins can delete any task and user can delete their respective tasks

Basic React frontend connected to backend APIs

MongoDB database

Fully documented APIs

🏗️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Frontend

React.js

Axios

Context API / LocalStorage

📁 Project Structure
backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── config/
│── server.js

frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.jsx

🔌 API Documentation

You can test all APIs using Postman or Swagger.

Postman Collection (JSON)

Upload a file named: postman_collection.json

Example Endpoints:

Auth Routes
Method	Route	Description
POST	/api/auth/register	Create new user
POST	/api/auth/login	Login and receive JWT
Task Routes
Method	Route	Description
GET	/api/tasks	Get all tasks for logged user
POST	/api/tasks	Create a task
DELETE	/api/tasks/:id	Delete task (Admin or owner only)


Run backend:

npm install
npm start


Run frontend:

npm install
npm run dev



📈 Scalability Notes (Simple & Point-Wise)

Add this exactly in your README:

## 🧩 Scalability Notes

Use Microservices:
Authentication, tasks, and admin features can be split into separate services.

Enable Load Balancing:
Use Nginx, AWS ALB, or HAProxy to distribute traffic across servers.

Add Caching Layer:
Use Redis to cache frequent API responses (e.g., task list).

Horizontal Scaling:
Deploy multiple backend instances using Docker + Kubernetes.

Database Optimization:
Use MongoDB indexing on frequently queried fields (userId, status).

Use Message Queues:
RabbitMQ / Kafka for background jobs like analytics, notifications.

CDN for Frontend Assets:
Faster delivery of JS, CSS, and images.

Rate Limiting & Security:
Use express-rate-limit to protect from API abuse & DDoS.
