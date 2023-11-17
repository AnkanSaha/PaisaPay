import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import keys

// Setup Router
const Authenticator = Router(); // Create a router
Authenticator.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import All Services
import { Register } from "../../../Services/Authentication/Signup"; // Import Signup Service
import { Login_PaisaPay } from "../../../Services/Authentication/Login"; // Import Login Service
import { ForgetPasswordUpdater } from "../../../Services/Authentication/Forget Password"; // Import Forget Password Service

// Import Helpers
import { Multer } from "../../../Middleware/multer.middleware"; // Import Multer

// All Services
Authenticator.post("/create-new-account", Multer.single("ProfilePic"), Register); // Register Service with Multer
Authenticator.post("/login-with-paisapay", Login_PaisaPay); // Login Service with PaisaPay
Authenticator.post("/Update-Password", ForgetPasswordUpdater); // Forget Password Service

// Export Router
export default Authenticator; // Export router
