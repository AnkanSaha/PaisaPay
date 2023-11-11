import { Router } from 'express'; // Import Router from express
import CORS from 'cors'; // Import CORS from cors
import { StringKeys } from '../../settings/keys/keys'; // Import StringKeys from keys

// Setup Config
const Delete_Request_Manager = Router(); // Setup Get_Request_Manager as Router
Delete_Request_Manager.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// All Routes

// Export Get_Request_Manager
export default Delete_Request_Manager;
