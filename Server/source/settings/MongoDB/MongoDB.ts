// Import All Sub Instances
import { Client_Account_and_Connection_Instance, Transaction_Instance } from "./config/Build_Instance"; // Import All Instances


// Link All Instances as MongoInstances
export default {
    ClientAccount: Client_Account_and_Connection_Instance,
    Transaction :Transaction_Instance
}; // Export All Instances