// Import All Sub Instances
import { Client_Account_and_Connection_Instance } from "./config/Client Account Instances"; // Import MongoDB Connection

// Link All Instances as MongoInstances
const MongoInstances = {
    ClientAccount: Client_Account_and_Connection_Instance,
}

// Export All Instances
export default MongoInstances;