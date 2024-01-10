import { Router } from "express"; // Import express router

// Import Middleware
import { SessionValidation } from "../../utils/Incoming.Req.Check.utils"; // Import session validation
import InjectIPMiddleware from "../../Middleware/InjectIP.middleware"; // Import Inject IP Middleware
 
// Import All Sub Service Routes
import Authenticator from "../Routes/POST/Authentication.Route"; // Import authenticator
import HelpCenter from "../Routes/POST/Help.Center.Route"; // Import help center
import PaymentService from "../Routes/POST/Payment.Route"; // Import Payment

// Configure router
const PostRequestManager = Router(); // Create router

// inject Middleware
PostRequestManager.use(InjectIPMiddleware); // Inject IP Middleware (Inject IP Address in request body)

// All Sub Routes
PostRequestManager.use("/auth", Authenticator); // Use authenticator
PostRequestManager.use("/help-center", SessionValidation, HelpCenter); // Use help center
PostRequestManager.use("/WebhookPayment", PaymentService); // Use payment webhook manager
PostRequestManager.use("/Payment", SessionValidation, PaymentService); // Use Payment Service

// Export router
export default PostRequestManager; // Export router
