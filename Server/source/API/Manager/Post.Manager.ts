import { Router } from "express"; // Import express router
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers

// Import All Sub Service Routes
import Authenticator from "../Routes/POST/Authentication.Route"; // Import authenticator
import HelpCenter from "../Routes/POST/Help.Center.Route"; // Import help center
import PaymentService from "../Routes/POST/Payment.Route"; // Import Payment

// Configure router
const PostRequestManager = Router(); // Create router

// All Sub Routes
PostRequestManager.use("/auth", Authenticator); // Use authenticator
PostRequestManager.use("/help-center", Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), HelpCenter); // Use help center
PostRequestManager.use("/WebhookPayment", PaymentService); // Use payment webhook manager
PostRequestManager.use("/Payment", Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), PaymentService); // Use Payment Service

// Export router
export default PostRequestManager; // Export router
