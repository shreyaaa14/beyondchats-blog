# BeyondChats Blog Application

Full-stack blog application built with MERN stack (MongoDB, Express, React, Node.js).

## Features
- User authentication (Register/Login)
- Create, Read, Update, Delete blog posts
- Responsive design
- RESTful API

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Installation

### Backend Setup
\\\ash
npm install
npm start
\\\

### Frontend Setup
\\\ash
cd frontend
npm install
npm run dev
\\\

## Environment Variables
\\\env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=5000
\\\

## API Endpoints

### Authentication
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user

### Blog Posts
- GET /api/posts - Get all posts
- POST /api/posts - Create post
- PUT /api/posts/:id - Update post
- DELETE /api/posts/:id - Delete post

## Technologies Used
- React, Tailwind CSS
- Node.js, Express.js
- MongoDB, Mongoose
- JWT authentication

## Author
**Shreya Amrutkar**
ECE Student | Full-Stack Developer

## Submission
This project is submitted as an assignment for the **BeyondChats Full-Stack Developer Intern Position**.
