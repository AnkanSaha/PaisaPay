import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys, StatusCodes} from '../../../settings/keys/keys'; // Import keys
import rateLimit from 'express-rate-limit'; // Import rate limit for limiting request

// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

Authenticator.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 20 requests
    message: {
        status: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too many requests',
        message: 'Too many requests, please try again later',
        response: undefined,
    },
    standardHeaders: true, // Include standard headers for request limit
    legacyHeaders: false // Include legacy headers for request limit

}))

// Import All Services
import {Register} from "../../../Services/Authentication/Signup"; // Import Signup Service
import { Login_PaisaPay } from "../../../Services/Authentication/Login"; // Import Login Service
import { ForgetPasswordUpdater } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// Import Helpers
import {Multer} from '../../../Helper/config/multerConfig'; // Import Multer

// All Services 
Authenticator.post('/create-new-account', Multer.single('ProfilePic'), Register); // Register Service with Multer
Authenticator.post('/login-with-paisapay', Login_PaisaPay); // Login Service with PaisaPay
Authenticator.post('/Update-Password', ForgetPasswordUpdater); // Forget Password Service

// Export Router
export default Authenticator; // Export router