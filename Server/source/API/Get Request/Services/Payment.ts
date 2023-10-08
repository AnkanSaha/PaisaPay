import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import {StringKeys} from '../../../settings/keys/keys'; // Import keys


// Setup Router
const Payment = Router(); // Create a router
Payment.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// Service 
import {GetTransactionHistory} from '../../../Services/Payment/PaymentHistory'; // Import GetTransactionHistory

// All Services
Payment.get('/TransactionHistory/:PhoneNumber/:EmailID', GetTransactionHistory); // Get Transaction History

// Export Router
export default Payment; // Export router
