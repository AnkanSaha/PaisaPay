import { Router, json } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys

// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS


// Import All Services
import Signup from "../../../Services/Authentication/Signup"; // Import Signup Service

// All Services 
Authenticator.post('/create-new-account', json(), Signup); // Login Service

// Export Router
export default Authenticator; // Export router