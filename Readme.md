# 🚀 Welcome to Daily Task Backend API!

**Daily Task Backend API** is a simple and efficient RESTful API designed to manage daily tasks data. Built with **Node.js**, **Express**, and **MongoDB**, this backend service provides full **CRUD** (Create, Read, Update, Delete) operations with clean, maintainable code structure — ready for production use or integration with any frontend application.

## ✨ Features

- ✅ Get all tasks with **pagination** and **search** capability
- 📄 Retrieve detailed task information by ID
- ➕ Create new tasks (supports **bulk insert** of multiple task objects)
- ✏️ Update task data by ID
- ❌ Delete task by ID

## ⚙️ API Endpoints Overview

| Method | Endpoint               | Description                         |
|--------|------------------------|-------------------------------------|
| GET    | `/todolist/:user`      | Get all tasks (with pagination & search) |
| GET    | `/todolist/detail/:id` | Get task detail by ID               |
| POST   | `/todolist/`           | Create new task(s) (bulk supported) |
| PUT    | `/todolist/:id`        | Update task by ID                   |
| DELETE | `/todolist/:id`        | Delete task by ID                   |

## 🛠️ Tech Stack Used

- **Node.js**  
  JavaScript runtime environment for building fast and scalable backend services.

- **Express.js**  
  Minimal and flexible Node.js web framework for building APIs.

- **MongoDB**  
  NoSQL database for storing and retrieving task data.

- **Mongoose**  
  Elegant MongoDB object modeling for Node.js, making data validation and query building easier.

- **Morgan**  
  HTTP request logger middleware for better debugging during development.

- **CORS**  
  Middleware for enabling Cross-Origin Resource Sharing.

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
