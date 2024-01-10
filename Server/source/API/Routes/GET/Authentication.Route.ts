import { Router } from "express"; // Import Router from express

// Setup Router
const Authenticator = Router(); // Create a router

// Import All Services
import { ForgetPasswordAccountFinder } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// All Services
Authenticator.get("/ForgotPassword/:Email", ForgetPasswordAccountFinder); // Forgot Password Service

// Export Router
export default Authenticator; // Export router
