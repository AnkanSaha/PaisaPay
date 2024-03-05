import { Router } from "express"; // Import Router from express
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers

// Setup Config
const Put_Request_Manager = Router(); // Setup Get_Request_Manager as Router

// import Sub Routes
import ProfileDetails from "../Routes/PUT/Profile.Details.Route"; // Import Profile Details
import Authenticator from "../Routes/PUT/Authentication.Route"; // Import Authentication Route

// All Routes
Put_Request_Manager.use("/user", ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/update", Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), ProfileDetails); // Use User Route with SessionValidation Middleware
Put_Request_Manager.use("/auth", Authenticator); // Use Authentication Route

// Export Get_Request_Manager
export default Put_Request_Manager;
