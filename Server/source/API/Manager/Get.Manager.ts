import { Router } from "express"; // Import Router from express

// Import All Sub Service Routes
import AccountDetails from "../Routes/GET/Account.Details.Route"; // Import Account Details
import Authenticator from "../Routes/GET/Authentication.Route"; // Import Authentication
import HelpCenter from "../Routes/GET/Help.Center.Route"; // Import Help Center
import Payments from "../Routes/GET/Payments.Route"; // Import Payments
import Information from "../Routes/GET/ServerInfo.Details.Route"; // Import Server Info

// Setup Config
const Get_Request_Manager = Router(); // Setup Get_Request_Manager as Router

// All Sub Routes
Get_Request_Manager.use("/AccountDetails", AccountDetails); // Use Account Details
Get_Request_Manager.use("/Auth", Authenticator); // Use Account Details
Get_Request_Manager.use("/help", HelpCenter); // Use Help Center
Get_Request_Manager.use("/Payments", Payments); // Use Payments Route
Get_Request_Manager.use("/info", Information); // Get Server Info

// Export Get_Request_Manager
export default Get_Request_Manager;
