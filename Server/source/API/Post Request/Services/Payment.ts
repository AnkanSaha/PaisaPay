// imports
import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys

// Import Services
import { AddMoney } from "../../../Services/Payment/Add Money"; // Import Add Money Service
import {GetTransactionHistory} from '../../../Services/Payment/PaymentHistory'; // Import GetTransactionHistory
import {SessionValidation} from '../../../Helper/Incoming Request Checker'; // Import Session Validation

// Setup Router
const Payment = Router(); // Create a router
Payment.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// All Services
Payment.post('/add-money', AddMoney); // Add Money Service
// Service 
Payment.post('/TransactionHistory', SessionValidation, GetTransactionHistory); // Get Transaction History


// Export Router
export default Payment; // Export router