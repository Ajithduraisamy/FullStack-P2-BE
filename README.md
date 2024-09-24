**Todo List App (Backend)**

  This is the backend for the Todo List application, built using Node.js, Express, MongoDB, and JWT for authentication. The backend provides RESTful APIs to handle user registration, login, and todo task management (create, read, update, and delete tasks) with JWT-based authentication.

**Features**

  User authentication and registration with encrypted passwords using bcrypt.
  JWT-based authentication for protected routes.
  CRUD operations for managing todo tasks.
  Secure password storage with hashing (bcryptjs).
  CORS enabled for cross-origin requests.
  MongoDB used for data storage.

**  Tech Stack**

  Node.js: Backend runtime environment.
  Express.js: Web framework for building APIs.
  MongoDB: NoSQL database for storing users and tasks.
  JWT: For securing API endpoints via authentication.
  bcrypt.js: Password hashing and encryption.
  dotenv: Environment variables management.
  CORS: Allow cross-origin requests for development.

**  Usage**

  After setting up and running the backend server, you can interact with it using tools like Postman or from a frontend application.
  Make sure to pass the JWT token in the Authorization header when making requests to protected routes (e.g., task creation, viewing tasks).
