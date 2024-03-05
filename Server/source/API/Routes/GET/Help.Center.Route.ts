import { Router } from "express"; // Import Router from express
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Setup Router
const HelpCenter = Router(); // Create a router

// Import All Services
import { GetAllTickets } from "../../../Services/General/Help Center"; // Import Forgot Password Service

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers

// All Services
HelpCenter.get("/GetAllSupportHistory", Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), GetAllTickets); // Forgot Password Service

// Export Router
export default HelpCenter; // Export router
