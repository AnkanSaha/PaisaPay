import { Router } from "express"; // Import Router from express

// Setup Router
const Authenticator = Router(); // Create a router

// Import Service
import { ForgetPasswordUpdater } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// Routes
Authenticator.put("/Update-Password", ForgetPasswordUpdater); // Forget Password Service


// exports
export default Authenticator; // Export Authenticator