import {Router} from 'express'; // Importing Router from express
import CORS from 'cors'; // Importing CORS from cors
import { StringKeys, StatusCodes } from '../../../settings/keys/keys'; // Importing StringKeys from keys
import rateLimit from 'express-rate-limit'; // Import rate limit for limiting request


// Configure Router
const HelpCenter = Router(); // Create a router
HelpCenter.use(CORS({origin:StringKeys.CORS_URL})); // Use CORS

// Implement Rate Limit
HelpCenter.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // 20 requests
    message: {
        status: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too many requests',
        message: 'Too many requests, please try again later',
        response: undefined,
    },
}));

// Import All Services
import HelpCenterService from '../../../Services/General/Help Center'; // Import Help Center Service


// All Routes
HelpCenter.post('/create-new-ticket', HelpCenterService); // Create New Ticket

// Export Router
export default HelpCenter; // Export router