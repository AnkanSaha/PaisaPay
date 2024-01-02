import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import keys

// Setup Router
const TWO_F_A = Router(); // Create a router
TWO_F_A.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import All Services
import { GenerateChallengeForRegistration } from "../../../Services/Authentication/2FA"; // Import 2FA Service

// All Services
TWO_F_A.post("/Passkey/GenerateChallenge", GenerateChallengeForRegistration); // Login Service with PaisaPay


// Export Router
export default TWO_F_A; // Export router