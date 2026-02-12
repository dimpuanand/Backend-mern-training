// ============================================
// USER API ROUTES
// ============================================
// We are learning how to create RESTful API endpoints for user management
// Includes CRUD operations and authentication

import exp from 'express';
import {UserModel} from '../models/userModel.js';
import {hash,compare} from 'bcryptjs'; // For password hashing and comparison
import jwt from 'jsonwebtoken'; // For JWT token generation
import { verifyToken } from '../middlewares/verifyToken.js'; // Authentication middleware

export const userApp=exp.Router();

// ============================================
// CREATE USER (POST)
// ============================================
// We are learning how to create new users with password hashing
userApp.post('/users',async (req,res)=>{
    // Get user data from request body
    let newUser=req.body;
    
    // Hash the password using bcrypt (12 rounds of salting)
    // We are learning how to securely store passwords
    let hashedpassword=await hash(req.body.password,12)
    
    // Replace plain text password with hashed password
    newUser.password=hashedpassword;
    
    console.log(newUser)
    
// ============================================
// GET ALL USERS (GET)
// ============================================
// We are learning how to retrieve all documents from a collection
userApp.get('/users',async(req,res)=>{
    // Fetch all users from database using find()
   ============================================
// GET USER BY ID (GET)
// ============================================
// We are learning how to retrieve a specific document by ID
userApp.get('/users/:id',async (req,res)=>{
    // Extract user ID from URL parameters
    let objId=req.params.id;
    
    // Find user by MongoDB ObjectID
    let userObj=await UserModel.findById(objId);
    
    // Return the user objectccess response with 201 (Created) status
    res.status(201).json({message:"user created"})

})

userApp.get('/users',async(req,res)=>{
     // read the users
    let usersList=await UserModel.find()
    res.status(200).json({message:"users",payload:usersList});
})
 ============================================
// UPDATE USER (PUT)
// ============================================
// We are learning how to update existing documents
userApp.put("/users/:id",async (req,res)=>{
    // Get user ID from URL parameters
    let objId=req.params.id
    
    // Get updated user data from request body
    let modifiedUser=req.body;
    
    // Update user in database
    // $set operator updates only specified fields
    // new:true returns the updated document
   ============================================
// DELETE USER (DELETE)
// ============================================
// We are learning how to delete documents from the database
userApp.delete("/users/:id",async (req,res)=>{
    // Get user ID from URL parameters
    let objId=req.params.id;
    
    // Delete user by ID and return deleted document
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    
   ============================================
// USER AUTHENTICATION (LOGIN)
// ============================================
// We are learning how to implement JWT-based authentication
userApp.post('/auth',async (req,res)=>{
    // Get username and password from request body
    let userCred=req.body;
    
    // Check if user exists in database
    let userObj=await UserModel.findOne({username:userCred.username})
    
    // If user not found, return 404 error
    if(userObj==null){
        return res.status(404).json({message:"invalid username"})
    }
    else{
        // Compare provided password with hashed password in database
        // We are learning how bcrypt compares passwords securely
        let status=await compare(userCred.password,userObj.password)
        
        // If password doesn't match
        if(status==false){
            return res.status(401).json({message:"invalid password"})
        }
        
        // Create JWT token with user data (expires in 30 seconds)
        // We are learning how to generate JWT tokens
        let signedToken=jwt.sign({username:userObj.username},'secret',{expiresIn:30})
        
        // Save token as httpOnly cookie (cannot be accessed by JavaScript)
        // We are learning about secure cookie-based authentication
        res.cookie('token',signedToken,{
            httpOnly:true, // Prevents XSS attacks
            secure:false, // Set to true in production (requires HTTPS)
   ============================================
// PROTECTED ROUTE - TEST ENDPOINT
// ============================================
// We are learning how to protect routes using middleware
// This route can only be accessed with a valid JWT tokenCSRF protection
        })
        
        // Send success response

// user authentication
userApp.post('/auth',async (req,res)=>{
    //get username and password from req body
    let userCred=req.body;
    //check for username
    let userObj=await UserModel.findOne({username:userCred.username})
    //if user not exists
    if(userObj==null){
        return res.status(404).json({message:"invalid username"})
    }
    else{
        //compare the password
        let status=await compare(userCred.password,userObj.password)
        if(status==false){
            return res.status(401).json({message:"invalid password"})
        }
        //create signed token
        let signedToken=jwt.sign({username:userObj.username},'secret',{expiresIn:30})
        //save token as httpOnly cookie
        res.cookie('token',signedToken,{httpOnly:true, 
            secure:false,
            sameSite:'lax'
        })
        //send res
        res.status(200).json({message:"login success"})
    }
})

//test route (protected route)
userApp.get('/test',verifyToken,(req,res)=>{
    res.status(200).json({message:"test success"})
})


