import {Router} from 'express'; // Import express router
import CORS from 'cors'; // Import cors
import {StringKeys} from '../../settings/keys/keys'; // Import keys

// Import Middleware
import { SessionValidation } from '../../Helper/Incoming Request Checker'; // Import session validation

// Import All Sub Service Routes
import Authenticator from './Services/Authentication'; // Import authenticator
import HelpCenter from './Services/Help Center'; // Import help center
import WebhookPayment from './Services/Payment'; // Import payment

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({origin: StringKeys.CORS_URL})); // Use cors

// All Sub Routes
PostRequestManager.use('/auth', Authenticator); // Use authenticator
PostRequestManager.use('/help-center', SessionValidation, HelpCenter); // Use help center
PostRequestManager.use('/WebhookPayment', WebhookPayment); // Use payment webhook manager 

// Export router
export default PostRequestManager; // Export router
