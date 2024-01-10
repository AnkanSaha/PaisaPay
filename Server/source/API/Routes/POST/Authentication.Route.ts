import { Router } from "express"; // Import Router from express

// Setup Router
const Authenticator = Router(); // Create a router

// Import All Services
import { Register } from "../../../Services/Authentication/Signup"; // Import Signup Service
import { Login_PaisaPay } from "../../../Services/Authentication/Login"; // Import Login Service

// Import Helpers
import { Multer } from "../../../Middleware/multer.middleware"; // Import Multer

// All Services
Authenticator.post("/create-new-account", Multer.single("ProfilePic"), Register); // Register Service with Multer
Authenticator.post("/login-with-paisapay", Login_PaisaPay); // Login Service with PaisaPay

// Export Router
export default Authenticator; // Export router
