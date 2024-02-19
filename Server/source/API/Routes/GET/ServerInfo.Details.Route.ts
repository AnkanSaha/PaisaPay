import { Router } from "express"; // Import Router from express

// Setup Router
const Information = Router(); // Create a router

// Import All Services
import IPAddressInfoService from "../../../Services/General/IP Address Info Management"; // Import IP Address Info Service

// All Services
Information.get("/IP_Details", IPAddressInfoService); // Forgot Password Service

// Export Router
export default Information; // Export router
