import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import keys


// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS


// Import Service
import { ForgetPasswordUpdater } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// Routes
Authenticator.put("/Update-Password", ForgetPasswordUpdater); // Forget Password Service


// exports
export default Authenticator; // Export Authenticator