import { Router } from "express"; // Import Router from express
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Setup Config
const Delete_Request_Manager = Router(); // Setup Get_Request_Manager as Router

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers

// import Sub Routes
import Account from "../Routes/DELETE/Account.Route"; // Import Authenticator Route

// All Routes
Delete_Request_Manager.use("/Account", Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), Account); // Use Account Route

// Export Get_Request_Manager
export default Delete_Request_Manager;
