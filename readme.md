# Task Management System - React JS and Node.js

## Introduction

 Frontend and Backend Development assignment. The goal is to create a simple task management system with user authentication, task CRUD operations, and state management using React JS for the frontend and Node.js with Express for the backend.

## `Frontend Development (React JS)`

### Features

- User authentication (sign up, login).
- Add, edit, and delete tasks.
- State management using React Context.

### Instructions to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/techdkumardev09/taskManagement.git
   ```
2. Navigate to the frontend directory:

   ```bash
   cd taskManagement/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Open your browser and visit http://localhost:3000.

### `Backend Development (Node.js with Express)`

### Features

- Node.js server using Express.
- RESTful API endpoints for user authentication and task - management.
- JWT-based authentication.
- Mongo database for storing task data.

### Instructions to Run Locally


1. Navigate to the backend directory.
   ```bash
   cd task-management-app/backend
   ```
2. Install dependencies.

   ```bash
   npm install
   ```

3. Set up MongoDB database on your browser

4. Run the server:
   ```bash
   npm start
   ```
5. The server will run based on env file on http://localhost:8082


### You need to setup .env file, like you need to add values in the keys for run B.E

PORT : "PORT HERE FOR" ex: 8082
MONGODB_URL :  "After login to mongoDB it provide to connect url"
JWT_TOKEN : "Need to add any string on this for the testing purpose"

