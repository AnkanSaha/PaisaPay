import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys

// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// Import All Services
import {Register} from "../../../Services/Authentication/Signup"; // Import Signup Service

// Import Helpers
import {Multer} from '../../../Helper/multerConfig'; // Import Multer

// All Services 
Authenticator.post('/create-new-account', Multer.single('ProfilePic'), Register); // Register Service with Multer

// Export Router
export default Authenticator; // Export router