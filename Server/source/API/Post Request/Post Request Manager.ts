import {Router} from 'express'; // Import express router
import CORS from 'cors'; // Import cors
import {StringKeys} from '../../settings/keys/keys'; // Import keys

// Import All Sub Service Routes
import Authenticator from './Services/Authentication'; // Import authenticator
import HelpCenter from './Services/Help Center'; // Import help center

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({origin: StringKeys.CORS_URL})); // Use cors

// All Sub Routes
PostRequestManager.use('/auth', Authenticator); // Use authenticator
PostRequestManager.use('/help-center', HelpCenter); // Use help center

// Export router
export default PostRequestManager; // Export router
