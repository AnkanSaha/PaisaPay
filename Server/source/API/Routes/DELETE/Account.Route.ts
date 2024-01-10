import { Router } from "express"; // Import Router from express

// Setup Router
const Account = Router(); // Create a router

// Import Services
import { AccountActivationDeactivationManagement } from "../../../Services/User Account/Account Activate - Deactivate Management"; // Import Account Activation Deactivation Management Service

// All Routes
Account.delete('/activate-deactivate-account', AccountActivationDeactivationManagement); // Account Activation Deactivation Management Service

// Exports
export default Account; // Export router