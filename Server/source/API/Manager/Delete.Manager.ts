import { Router } from "express"; // Import Router from express

// Setup Config
const Delete_Request_Manager = Router(); // Setup Get_Request_Manager as Router

// Middlewares
import { SessionValidation } from "../../utils/Incoming.Req.Check.utils"; // Import Session Validation

// import Sub Routes
import Account from "../Routes/DELETE/Account.Route"; // Import Authenticator Route

// All Routes
Delete_Request_Manager.use('/Account', SessionValidation, Account); // Use Account Route

// Export Get_Request_Manager
export default Delete_Request_Manager;
