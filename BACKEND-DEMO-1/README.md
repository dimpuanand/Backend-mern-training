# 🎓 BACKEND-DEMO-1 - Learning Project

## 📚 What We're Learning

This is a **class practice project** where we are learning to build a **RESTful API backend application** using **Node.js**, **Express.js**, and **MongoDB**. This project demonstrates fundamental backend development concepts including database integration, authentication, and API design.

---

## 🎯 Learning Objectives

Through this project, we are learning:

1. **Node.js Backend Development**
   - Setting up a Node.js server
   - Using ES6 modules (`import`/`export`)
   - Async/await for handling asynchronous operations

2. **Express.js Framework**
   - Creating HTTP servers
   - Routing and middleware
   - Request/response handling
   - Error handling middleware

3. **MongoDB & Mongoose**
   - Connecting to MongoDB database
   - Creating schemas and models
   - Data validation using Mongoose
   - CRUD operations (Create, Read, Update, Delete)

4. **Authentication & Security**
   - Password hashing with bcryptjs
   - JWT (JSON Web Token) authentication
   - Cookie-based session management
   - Protected routes using middleware

5. **API Design Patterns**
   - RESTful API principles
   - HTTP status codes
   - JSON request/response format
   - Route organization and modularity

---

## 📁 Project Structure

```
BACKEND-DEMO-1/
│
├── server.js                 # Main server entry point
├── package.json             # Project dependencies and scripts
├── req.http                 # API testing requests (REST Client)
├── info.txt                 # Learning notes about Mongoose
│
├── API's/                   # API Route Handlers
│   ├── UserAPI.js          # User-related endpoints (CRUD + Auth)
│   └── ProductAPI.js       # Product-related endpoints (CRUD)
│
├── models/                  # Database Models (Schemas)
│   ├── userModel.js        # User schema with validation
│   └── productModel.js     # Product schema with validation
│
└── middlewares/            # Custom Middleware Functions
    └── verifyToken.js      # JWT authentication middleware
```

---

## 🛠️ Technologies We're Using

| Technology | Purpose | What We're Learning |
|-----------|---------|-------------------|
| **Node.js** | JavaScript runtime | Backend JavaScript execution |
| **Express.js** | Web framework | Creating APIs and handling HTTP requests |
| **MongoDB** | NoSQL database | Storing and managing data |
| **Mongoose** | ODM for MongoDB | Schema validation and database operations |
| **bcryptjs** | Password hashing | Secure password storage |
| **jsonwebtoken** | JWT tokens | User authentication and authorization |
| **cookie-parser** | Cookie handling | Reading cookies from requests |

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Steps to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

4. **Server will start on:**
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoints We've Created

### 👤 User API (`/user-api`)

| Method | Endpoint | Description | What We're Learning |
|--------|----------|-------------|-------------------|
| POST | `/user-api/users` | Create new user | Password hashing, data validation |
| GET | `/user-api/users` | Get all users | Retrieving data from database |
| GET | `/user-api/users/:id` | Get user by ID | URL parameters, finding by ID |
| PUT | `/user-api/users/:id` | Update user | Updating documents with validation |
| DELETE | `/user-api/users/:id` | Delete user | Deleting documents from database |
| POST | `/user-api/auth` | User login | Authentication, JWT creation, cookies |
| GET | `/user-api/test` | Protected route | Middleware authentication |

### 🛍️ Product API (`/product-api`)

| Method | Endpoint | Description | What We're Learning |
|--------|----------|-------------|-------------------|
| POST | `/product-api/products` | Create new product | Creating documents |
| GET | `/product-api/products` | Get all products | Fetching all records |
| GET | `/product-api/products/:id` | Get product by ID | Finding specific records |
| PUT | `/product-api/products/:id` | Update product | Updating with validators |
| DELETE | `/product-api/products/:id` | Delete product | Removing documents |

---

## 🧪 Testing the API

We're using the `req.http` file with the **REST Client** extension in VS Code to test our APIs.

### Example: Creating a User
```http
POST http://127.0.0.1:3000/user-api/users
Content-Type: application/json

{
    "username": "pavan",
    "password": "pavan",
    "age": 19
}
```

### Example: User Login
```http
POST http://127.0.0.1:3000/user-api/auth
Content-Type: application/json

{
    "username": "pavan",
    "password": "pavan"
}
```

### Example: Testing Protected Route
```http
GET http://127.0.0.1:3000/user-api/test
```
*(Must login first to get authentication cookie)*

---

## 🔐 Authentication Flow We're Learning

1. **User Registration:**
   - User sends username, password, and age
   - Password is hashed using bcrypt
   - User data is saved to MongoDB

2. **User Login:**
   - User sends credentials
   - Server verifies username exists
   - Server compares hashed passwords
   - If valid, JWT token is created
   - Token is stored as httpOnly cookie

3. **Accessing Protected Routes:**
   - Client sends request with cookie
   - Middleware extracts token from cookie
   - Token is verified using secret key
   - If valid, request proceeds to route handler

---

## 📝 Key Concepts We're Learning

### 1. **Mongoose Schema Validation**
We're learning that Mongoose helps reduce code by providing built-in validation:
- `required`: Field is mandatory
- `minLength`/`maxLength`: String length validation
- `min`/`max`: Number range validation
- Automatic error messages for validation failures

**Without Mongoose:** We would need many if-else blocks to validate data.

**With Mongoose:** We just define validation rules in the schema!

### 2. **Error Handling Middleware**
We're learning that Express automatically invokes error handling middleware when it detects an error:
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "error", reason: err.message });
});
```

### 3. **Password Security**
We're learning to NEVER store plain text passwords:
- Use bcrypt to hash passwords with salt rounds
- Hashed passwords cannot be reversed
- Use `compare()` to verify passwords during login

### 4. **JWT Tokens**
We're learning how tokens work:
- Signed tokens contain user information
- Tokens have expiration times
- Secret key is used to sign and verify
- Tokens stored as httpOnly cookies prevent XSS attacks

---

## 🎓 What We Practiced

✅ Setting up Express server  
✅ Connecting to MongoDB database  
✅ Creating Mongoose schemas and models  
✅ Implementing CRUD operations  
✅ Password hashing with bcrypt  
✅ JWT-based authentication  
✅ Cookie-based session management  
✅ Creating middleware functions  
✅ Error handling in Express  
✅ Organizing code into modules  
✅ Testing APIs with REST Client  
✅ Understanding async/await patterns  

---

## 🌟 Database Schema

### User Schema
```javascript
{
  username: String (required, 4-8 chars),
  password: String (required, hashed),
  age: Number (required, 18-25),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Product Schema
```javascript
{
  productname: String (required),
  price: Number (required, min: 1),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## 📚 Dependencies Explained

```json
{
  "express": "Web framework for creating APIs",
  "mongoose": "MongoDB object modeling tool",
  "bcryptjs": "Library for hashing passwords",
  "jsonwebtoken": "Creating and verifying JWT tokens",
  "cookie-parser": "Parsing cookies from requests"
}
```

---

## 🎯 Next Steps in Our Learning

- [ ] Add input validation and sanitization
- [ ] Implement refresh tokens
- [ ] Add rate limiting for security
- [ ] Create user roles and permissions
- [ ] Add pagination for GET requests
- [ ] Implement password reset functionality
- [ ] Add email verification
- [ ] Deploy to cloud platform (Heroku, AWS, etc.)

---

## 📖 Notes from Class

From our `info.txt`:
- Mongoose helps reduce code with easy validation features
- Validation is required during insertion and updating
- Validation is NOT required during reading
- We use methods like `insertOne()`, `insertMany()`, or `save()` to store data
- Express automatically invokes error handler middleware when it senses an error

---

## 👨‍🎓 Learning Outcomes

By completing this project, we have gained practical experience in:
- Building backend APIs from scratch
- Working with databases
- Implementing security best practices
- Understanding authentication mechanisms
- Organizing code for maintainability
- Testing RESTful APIs

---

## 📞 Questions or Issues?

This is a learning project, so we're constantly improving! If you have questions or find issues:
- Review the code comments for explanations
- Check the `info.txt` for Mongoose notes
- Test endpoints using `req.http`
- Ask your instructor for clarification

---

**Happy Learning! 🚀**

---

*This project is part of our backend development course. We're learning by building!*
