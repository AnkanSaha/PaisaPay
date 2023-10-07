// imports
import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys

// Import Services
import { AddMoney } from "../../../Services/Payment/Add Money"; // Import Add Money Service

// Setup Router
const Payment = Router(); // Create a router
Payment.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// All Services
Payment.post('/add-money', AddMoney); // Add Money Service


// Export Router
export default Payment; // Export router