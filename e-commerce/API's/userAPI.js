// User API routes with authentication and cart management
import exp from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModels.js";

const userApp = exp.Router();

// Get all users
userApp.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            message: "Users fetched",
            payload: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
});

// Register new user with password hashing
userApp.post("/users", async (req, res) => {
    try {
        const userObj = req.body;
        
        // Validate user data
        await new UserModel(userObj).validate();
        
        // Hash password for secure storage
        const hashedPassword = await bcrypt.hash(userObj.password, 10);
        userObj.password = hashedPassword;
        
        // Save user to database
        const newUser = new UserModel(userObj);
        await newUser.save();
        
        // Send response without password
        const userResponse = newUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            message: "User created",
            payload: userResponse
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

// User login with password verification
userApp.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        
        // Return user data without password
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            message: "Login successful",
            payload: userResponse
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
});

// Add product to cart or increment quantity if already exists
userApp.put("/users/user-cart/userid/:userId/productid/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;
        
        // Find user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if product is already in cart
        const existingProduct = user.cart.find(
            item => item.product.toString() === productId
        );
        
        let result;
        if (existingProduct) {
            // Product exists: increment quantity
            result = await UserModel.findOneAndUpdate(
                { _id: userId, "cart.product": productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true }
            ).populate("cart.product", "productName price brand");
        } else {
            // Product not in cart: add new item
            result = await UserModel.findByIdAndUpdate(
                userId,
                { $push: { cart: { product: productId, quantity: 1 } } },
                { new: true }
            ).populate("cart.product", "productName price brand");
        }

        res.status(200).json({
            message: "Product added to cart",
            payload: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding product to cart",
            error: error.message
        });
    }
});

// Get user's cart with populated product details
userApp.get("/users/user-cart/userid/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Fetch user with cart details
        const user = await UserModel.findById(userId).populate("cart.product", "productName price brand");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User cart fetched",
            payload: user.cart
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user cart",
            error: error.message
        });
    }
});

export default userApp;