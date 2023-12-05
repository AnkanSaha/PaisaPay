import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import keys

// Setup Router
const Payments = Router(); // Create a router
Payments.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import All Services
import { Get_Request_money } from '../../../Services/Payment/Request Money'; // Import Request Money

// All Services
Payments.get("/listofrequests", Get_Request_money); // Get List of Requests

// Export Router
export default Payments; // Export router
