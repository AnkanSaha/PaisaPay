// imports
import { Router } from 'express'; // Import Router from express
import CORS from 'cors'; // Import CORS from cors
import { StringKeys } from '../../../settings/keys/keys'; // Import keys

// Import Services
import { AddMoney } from '../../../Services/Payment/Add Money'; // Import Add Money Service
import { GetTransactionHistory } from '../../../Services/Payment/PaymentHistory'; // Import GetTransactionHistory
import { SendMoney } from '../../../Services/Payment/Send Money'; // Import Send Money Service
import { WithdrawalMoney } from '../../../Services/Payment/Withdrawal'; // Import Withdrawal Money Service

// Setup Router
const Payment = Router(); // Create a router
Payment.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// All Services
Payment.post('/add-money', AddMoney); // Add Money Service
Payment.post('/TransactionHistory', GetTransactionHistory); // Get Transaction History
Payment.post('/NewTransaction', SendMoney); // Get Transaction History
Payment.post('/NewWithdrawal', WithdrawalMoney);
// Export Router
export default Payment; // Export router
