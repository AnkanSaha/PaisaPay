import { Router } from "express"; // Importing Router from express

// Configure Router
const HelpCenter = Router(); // Create a router

// Import All Services
import HelpCenterService from "../../../Services/General/Help Center"; // Import Help Center Service

// All Routes
HelpCenter.post("/create-new-ticket", HelpCenterService); // Create New Ticket

// Export Router
export default HelpCenter; // Export router
