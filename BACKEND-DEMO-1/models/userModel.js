// ============================================
// USER MODEL - Mongoose Schema & Model
// ============================================
// We are learning how to define data models using Mongoose
// This file defines the structure and validation rules for User documents

import {Schema,model} from 'mongoose';

// Create user schema with validation rules
// Schema defines the structure of documents in the MongoDB collection
const userSchema=new Schema({
username:{
    type:String,
    required:[true,"username is required"], // Field is mandatory
    minLength:[4,"min length is should be 4"], // Minimum 4 characters
    maxLength:[8,"max length exceeded"] // Maximum 8 characters
},
password:{
    type:String,
    required:[true,"password is required"] // Password is mandatory
},
age:{
    type:Number,
    requires:[true,"age is required"], // Age is required
    min:[18,"age should be above 18"], // Minimum age validation
    max:[25,"age should be below 25"], // Maximum age validation
}

},{
    strict:"throw", // Throw error if extra fields are passed
    timestamps:true // Automatically add createdAt and updatedAt fields
});

// Create and export the User model
// This model provides methods to interact with the 'user' collection in MongoDB
// We are learning how Mongoose models provide built-in CRUD operations
export const UserModel=model("user",userSchema)
