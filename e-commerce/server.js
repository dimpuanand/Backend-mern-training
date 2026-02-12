// Import dependencies
import exp from "express";
import {connect} from "mongoose";
import userApp from "./API's/userAPI.js";
import productApp from "./API's/productAPI.js";

const app = exp();

// Server configuration
const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1:27017/ecommerceDB";

// Connect to MongoDB
async function connectDB() {
try {
    await connect(MONGO_URL);
    console.log("Connected to MongoDB");
}
catch (error) {}
}
connectDB()

// Middleware to parse JSON requests
app.use(exp.json());

// Route handlers
app.use("/user-api", userApp);
app.use("/product-api", productApp);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});