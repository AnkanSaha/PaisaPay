import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys

// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// Import All Services
import { ForgetPasswordAccountFinder } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// All Services
Authenticator.get('/ForgotPassword/:Email', ForgetPasswordAccountFinder); // Forgot Password Service

// Export Router
export default Authenticator; // Export router