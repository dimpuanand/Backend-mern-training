// ============================================
// PRODUCT MODEL - Mongoose Schema & Model
// ============================================
// We are learning how to create product models with validation

import emp from "express";
import { Schema, model} from "mongoose";

// Define product schema with field validation
const productSchema = new Schema({
    productname: { 
        type: String, 
        required: true, // Product name is mandatory
        message: "product name is required" 
    },
    price: { 
        type: Number, 
        min:1, // Price must be at least 1
        required: true, // Price is mandatory
        message: "prize must be greater than 0" 
    },
}, {
    strict: "throw", // Reject documents with fields not in schema
    timestamps: true // Auto-generate createdAt and updatedAt
});

// Create and export Product model
// We are learning how to create models for different entities
export const ProductModel = model('Product', productSchema);