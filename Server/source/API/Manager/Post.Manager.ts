import { Router } from "express"; // Import express router
import CORS from "cors"; // Import cors
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import keys

// Import Middleware
import { SessionValidation } from "../../utils/Incoming.Req.Check.utils"; // Import session validation

// Import All Sub Service Routes
import Authenticator from "../Routes/POST/Authentication.Route"; // Import authenticator
import HelpCenter from "../Routes/POST/Help.Center.Route"; // Import help center
import PaymentService from "../Routes/POST/Payment.Route"; // Import Payment

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({ origin: StringKeys.CORS_URL })); // Use cors

// All Sub Routes
PostRequestManager.use("/auth", Authenticator); // Use authenticator
PostRequestManager.use("/help-center", SessionValidation, HelpCenter); // Use help center
PostRequestManager.use("/WebhookPayment", PaymentService); // Use payment webhook manager
PostRequestManager.use("/Payment", SessionValidation, PaymentService); // Use Payment Service

// Export router
export default PostRequestManager; // Export router
