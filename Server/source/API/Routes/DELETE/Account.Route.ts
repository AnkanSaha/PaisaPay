import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import keys

// Setup Router
const Account = Router(); // Create a router
Account.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import Services
import { AccountActivationDeactivationManagement } from "../../../Services/User Account/Account Activate - Deactivate Management"; // Import Account Activation Deactivation Management Service

// All Routes
Account.delete('/activate-deactivate-account', AccountActivationDeactivationManagement); // Account Activation Deactivation Management Service

// Exports
export default Account; // Export router