// ============================================
// PRODUCT API ROUTES
// ============================================
// We are learning how to create CRUD operations for products

import exp from 'express';
import {ProductModel} from '../models/productModel.js'

export const productApp=exp.Router();

// ============================================
// GET ALL PRODUCTS (GET)
// ============================================
// We are learning how to fetch all products from database
productApp.get('/products',async(req,res)=>{
    // Retrieve all products using find() method
// ============================================
// CREATE PRODUCT (POST)
// ============================================
// We are learning how to create new products
productApp.post('/products',async (req,res)=>{
    // Get new product data from request body
    let newProduct=req.body;
    console.log(newProduct)
    
    // Create new product document using the model
    let newProductDoc=new ProductModel(newProduct)
    
    // Save product to database
    await newProductDoc.save();
    
    // Send success response
    let newProduct=req.body;
    console.log(newProduct)
   ============================================
// GET PRODUCT BY ID (GET)
// ============================================
// We are learning how to find a specific product by its ID
productApp.get('/products/:id',async (req,res)=>{
    // Extract product ID from URL parameters
    let prodId=req.params.id;
    
    // Find product by MongoDB ObjectID
    let prodObj=await ProductModel.findById(prodId);
    
   ============================================
// UPDATE PRODUCT (PUT)
// ============================================
// We are learning how to update product information
productApp.put("/products/:id",async (req,res)=>{
    // Get product ID from URL parameters
    let prodId=req.params.id
    
    // Get updated product data from request body
    let modifiedProduct=req.body;
    
    // Update product in database with validation
    let latestProduct=await ProductModel.findByIdAndUpdate(prodId,
        {$set:{...modifiedProduct}},
   ============================================
// DELETE PRODUCT (DELETE)
// ============================================
// We are learning how to delete products from database
productApp.delete("/products/:id",async (req,res)=>{
    // Get product ID from URL parameters
    let objId=req.params.id;
    
    // Delete product by ID
    let productUser=await ProductModel.findByIdAndDelete(objId)
    
    // Confirm deletion
    //get objId from url params
    let prodId=req.params.id
    //get modified from products
    let modifiedProduct=req.body;
    //make update
    let latestProduct=await ProductModel.findByIdAndUpdate(prodId,
        {$set:{...modifiedProduct}},
        {new:true,runValidators:true});
    //send res
    res.status(202).json({message:"product modified",payload:latestProduct})
})

//Delete product 

productApp.delete("/products/:id",async (req,res)=>{
    //get obj by id
    let objId=req.params.id;
    //delete product by id 
    let productUser=await ProductModel.findByIdAndDelete(objId)
    res.status(200).json({message:"product removed",payload:productUser})

})