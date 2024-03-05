import { Router } from "express"; // Import Router from express
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Setup Router
const Payments = Router(); // Create a router

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers


// Import All Services
import { Get_Request_money } from "../../../Services/Payment/Request Money"; // Import Request Money

// All Services
Payments.get("/listofrequests", Middleware.JWTValidator('sessionID', StringKeys.JWT_SECRET), Get_Request_money); // Get List of Requests

// Export Router
export default Payments; // Export router
