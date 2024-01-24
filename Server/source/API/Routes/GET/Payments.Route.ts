import { Router } from "express"; // Import Router from express

// Setup Router
const Payments = Router(); // Create a router

// Import All Services
import { Get_Request_money } from "../../../Services/Payment/Request Money"; // Import Request Money

// All Services
Payments.get("/listofrequests", Get_Request_money); // Get List of Requests

// Export Router
export default Payments; // Export router
