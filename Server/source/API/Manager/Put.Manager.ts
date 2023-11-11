import { Router } from 'express'; // Import Router from express
import CORS from 'cors'; // Import CORS from cors
import { StringKeys } from '../../settings/keys/keys'; // Import StringKeys from keys

// Setup Config
const Put_Request_Manager = Router(); // Setup Get_Request_Manager as Router
Put_Request_Manager.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// import Sub Routes
import ProfileDetails from '../Routers/PUT/Profile.Details.Route'; // Import Profile Details

// All Routes
Put_Request_Manager.use('/user', ProfileDetails); // Use User Route with SessionValidation Middleware

// Export Get_Request_Manager
export default Put_Request_Manager;
