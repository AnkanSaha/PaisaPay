import { Router } from 'express'; // Import express router
import CORS from 'cors'; // Import cors
import { StringKeys } from '../../settings/keys/keys'; // Import keys

// Import Middleware
import { SessionValidation } from '../../Helper/Incoming Request Checker'; // Import session validation

// Import All Sub Service Routes
import Authenticator from '../Routers/POST/Authentication.Route'; // Import authenticator
import HelpCenter from '../Routers/POST/Help.Center.Route'; // Import help center
import PaymentService from '../Routers/POST/Payment.Route'; // Import Payment

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({ origin: StringKeys.CORS_URL })); // Use cors

// All Sub Routes
PostRequestManager.use('/auth', Authenticator); // Use authenticator
PostRequestManager.use('/help-center', SessionValidation, HelpCenter); // Use help center
PostRequestManager.use('/WebhookPayment', PaymentService); // Use payment webhook manager
PostRequestManager.use('/Payment', PaymentService); // Use Payment Service

// Export router
export default PostRequestManager; // Export router
