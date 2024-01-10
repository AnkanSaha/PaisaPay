import { Router } from "express"; // Import Router from express

// Setup Router
const HelpCenter = Router(); // Create a router

// Import All Services
import { GetAllTickets } from "../../../Services/General/Help Center"; // Import Forgot Password Service

// Import Middlewares
import { SessionValidation } from "../../../utils/Incoming.Req.Check.utils"; // Import Incoming Request Checker
// All Services
HelpCenter.get("/GetAllSupportHistory", SessionValidation, GetAllTickets); // Forgot Password Service

// Export Router
export default HelpCenter; // Export router
