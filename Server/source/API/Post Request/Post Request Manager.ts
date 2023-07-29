import {Router} from 'express'; // Import express router
import CORS from 'cors'; // Import cors
import {StringKeys} from '../../settings/keys/keys'; // Import keys

// Configure router
const PostRequestManager = Router(); // Create router
PostRequestManager.use(CORS({origin: StringKeys.CORS_URL})); // Use cors

// All Sub Routes

// Export router
export default PostRequestManager; // Export router
