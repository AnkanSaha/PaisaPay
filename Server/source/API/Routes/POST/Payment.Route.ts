// imports
import { Router } from "express"; // Import Router from express

// Import Services
import { AddMoney } from "../../../Services/Payment/Add Money"; // Import Add Money Service
import { GetTransactionHistory } from "../../../Services/Payment/PaymentHistory"; // Import GetTransactionHistory
import { SendMoney } from "../../../Services/Payment/Send Money"; // Import Send Money Service
import { WithdrawalMoney } from "../../../Services/Payment/Withdrawal"; // Import Withdrawal Money Service
import RequestMoney, { Accept_Request_Money } from "../../../Services/Payment/Request Money"; // Import Request Money Service

// Setup Router
const Payment = Router(); // Create a router

// All Services
Payment.post("/add-money", AddMoney); // Add Money Service
Payment.post("/TransactionHistory", GetTransactionHistory); // Get Transaction History
Payment.post("/NewTransaction", SendMoney); // Get Transaction History
Payment.post("/NewWithdrawal", WithdrawalMoney); // Send Money Service
Payment.post("/request-money", RequestMoney); // Request Money Service
Payment.post("/send-money-for-request", Accept_Request_Money); // Send Money Service

// Export Router
export default Payment; // Export router
