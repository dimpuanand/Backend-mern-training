// ============================================
// BACKEND-DEMO-1 - Main Server File
// ============================================
// This is the entry point of our Node.js backend application
// We are learning how to create a RESTful API server using Express.js

// Import required modules
import express from 'express'; // Express framework for creating web server
import {userApp} from './API\'s/UserAPI.js'; // User API routes
import {productApp} from './API\'s/ProductAPI.js'; // Product API routes
import {connect} from 'mongoose'; // MongoDB connection method
import cookieParser from 'cookie-parser'; // Middleware to parse cookies




// Create Express application instance
const app = express();

// Async function to connect to MongoDB database
// We are learning how to connect to MongoDB using Mongoose
async function connectToDB(){
    try{
        // Connect to local MongoDB database named 'MernDB'
        await connect("mongodb://localhost:27017/MernDB");
        console.log("DB connected");
        // Start the server only after successful database connection
        app.listen(3000, () => { console.log("Server running on port 3000");
    });
    }
    catch(err){
        // Handle connection errors
        console.log("DB connection failed", err);
    }
} ============================================
// MIDDLEWARE CONFIGURATION
// ============================================
// Middleware to parse incoming JSON request bodies
// This allows us to access req.body in our API routes
app.use(express.json());

// Middleware to parse cookies from incoming requests
// We use this for JWT authentication tokens stored in cookies
app.use(cookieParser());

// ============================================
// ROUTE HANDLERS
// ============================================
// Mount user-related API routes at '/user-api' path
app.use('/user-api', userApp);

// Mount product-related API routes at '/product-api' path
app.use('/product-api', productApp);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
// Global error handler - catches all errors from route handlers
// We are learning how Express automatically invokes this when errors occur

//forward to respective apis
app.use('/user-api', userApp);
app.use('/product-api', productApp);

//error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message:"error", reason:err.message });

}
);

