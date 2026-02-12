# E-Commerce Backend API

A Node.js/Express backend application for an e-commerce platform with user authentication and shopping cart functionality.

## Features

- **User Management**
  - User registration with password hashing (bcrypt)
  - User login authentication
  - Secure password storage

- **Product Management**
  - Create new products
  - Fetch all products

- **Shopping Cart**
  - Add products to user cart
  - Auto-increment quantity for duplicate products
  - View user cart with populated product details

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcryptjs for password hashing

## API Endpoints

### User Routes (`/user-api`)
- `GET /users` - Fetch all users
- `POST /users` - Create new user (with password hashing)
- `POST /users/login` - User login
- `PUT /users/user-cart/userid/:userId/productid/:productId` - Add product to cart
- `GET /users/user-cart/userid/:userId` - Get user cart

### Product Routes (`/product-api`)
- `GET /products` - Fetch all products
- `POST /products` - Create new product

## Database Schema

### User Schema
- userName (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- cart (Array of products with quantities)

### Product Schema
- productName (String, required)
- price (Number, required)
- brand (String, required)

## Setup

1. Install dependencies: `npm install`
2. Ensure MongoDB is running locally on port 27017
3. Start server: `node server.js`
4. Server runs on port 4000

## Database Connection

MongoDB connection: `mongodb://127.0.0.1:27017/ecommerceDB`

## Recent Changes

- Restructured repository to organize multiple backend projects
- Updated .gitignore to exclude node_modules and sensitive files
- Synchronized local and remote repositories
