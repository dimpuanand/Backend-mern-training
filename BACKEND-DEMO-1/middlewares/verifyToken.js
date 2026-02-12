// ============================================
// JWT TOKEN VERIFICATION MIDDLEWARE
// ============================================
// We are learning how to protect routes using JWT authentication
// This middleware checks if user has valid authentication token

import jwt from 'jsonwebtoken';

// Middleware function to verify JWT token from cookies
export function verifyToken(req,res,next){
    
    // Step 1: Extract token from cookies
    // We are learning how to read cookies from requests
    let signedToken=req.cookies.token;
    
    // Check if token exists
    if(!signedToken){
        return res.status(401).json({message:"please login first"})
    }
    
    // Step 2: Verify the token using secret key
    // We are learning how JWT tokens are verified
    let decodedToken= jwt.verify(signedToken,'secret')
    console.log("decoded token",decodedToken);
    
    // Step 3: If token is valid, proceed to next middleware/route handler
    next();
}
