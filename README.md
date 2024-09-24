**Todo List App (Backend)**

  This is the backend for the Todo List application, built using Node.js, Express, MongoDB, and JWT for authentication. The backend provides RESTful APIs to handle user registration, login, and todo task management (create, read, update, and delete tasks) with JWT-based authentication.

**Features**

  1. User authentication and registration with encrypted passwords using bcrypt.
  2. JWT-based authentication for protected routes.
  3. CRUD operations for managing todo tasks.
  4. Secure password storage with hashing (bcryptjs).
  5. CORS enabled for cross-origin requests.
  6. MongoDB used for data storage.

**Tech Stack**

  1. Node.js: Backend runtime environment.
  2. Express.js: Web framework for building APIs.
  3. MongoDB: NoSQL database for storing users and tasks.
  4. JWT: For securing API endpoints via authentication.
  5. bcrypt.js: Password hashing and encryption.
  6. dotenv: Environment variables management.
  7. CORS: Allow cross-origin requests for development.

**Usage**

  1. After setting up and running the backend server, you can interact with it using tools like Postman or from a frontend application.
  2. Make sure to pass the JWT token in the Authorization header when making requests to protected routes (e.g., task creation, viewing tasks).
