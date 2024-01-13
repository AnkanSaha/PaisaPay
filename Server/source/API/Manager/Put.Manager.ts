import { Router } from "express"; // Import Router from express

// Import Middlewares
import { SessionValidation } from "../../utils/Incoming.Req.Check.utils"; // Import SessionValidation Middleware

// Setup Config
const Put_Request_Manager = Router(); // Setup Get_Request_Manager as Router

// import Sub Routes
import ProfileDetails from "../Routes/PUT/Profile.Details.Route"; // Import Profile Details
import Authenticator from "../Routes/PUT/Authentication.Route"; // Import Authentication Route

// All Routes
Put_Request_Manager.use("/user", ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/update", SessionValidation, ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/auth", Authenticator); // Use Authentication Route

// Export Get_Request_Manager
export default Put_Request_Manager;
