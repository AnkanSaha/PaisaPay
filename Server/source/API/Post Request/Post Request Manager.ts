import {Router} from 'express'; // Import express router
import CORS from 'cors'; // Import cors
import {StringKeys} from '../../settings/keys/keys'; // Import keys

// Import All Sub Service Routes
import Authenticator from './Services/Authentication'; // Import authenticator

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({origin: StringKeys.CORS_URL})); // Use cors

// All Sub Routes
PostRequestManager.use('/auth', Authenticator); // Use authenticator

// Export router
export default PostRequestManager; // Export router
