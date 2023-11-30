import { Router } from "express"; // Import Router from express
import CORS from "cors"; // Import CORS from cors
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import StringKeys from keys

// Import Middlewares
import { SessionValidation } from "../../utils/Incoming.Req.Check.utils"; // Import SessionValidation Middleware
import InjectIPMiddleware from "../../Middleware/InjectIP.middleware"; // Import Inject IP Middleware
 
// Setup Config
const Put_Request_Manager = Router(); // Setup Get_Request_Manager as Router
Put_Request_Manager.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS
Put_Request_Manager.use(InjectIPMiddleware); // Use InjectIPMiddleware (Inject IP Address in request body)

// import Sub Routes
import ProfileDetails from "../Routes/PUT/Profile.Details.Route"; // Import Profile Details
import Authenticator from "../Routes/PUT/Authentication.Route"; // Import Authentication Route

// All Routes
Put_Request_Manager.use("/user", ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/update", SessionValidation, ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/auth", Authenticator); // Use Authentication Route

// Export Get_Request_Manager
export default Put_Request_Manager;
