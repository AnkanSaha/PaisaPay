import { Router } from "express"; // Importing Router from express
import CORS from "cors"; // Importing CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Importing StringKeys from keys

// Configure Router
const HelpCenter = Router(); // Create a router
HelpCenter.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import All Services
import HelpCenterService from "../../../Services/General/Help Center"; // Import Help Center Service

// All Routes
HelpCenter.post("/create-new-ticket", HelpCenterService); // Create New Ticket

// Export Router
export default HelpCenter; // Export router
