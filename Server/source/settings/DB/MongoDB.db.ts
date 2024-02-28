// Import variables
import { NumberKeys } from "../keys/KeysConfig.keys.settings"; // Import Number Keys
import { Console } from "outers"; // Import Console

// Import All Sub Instances
import {
	Client_Account_and_Connection_Instance,
	Server_Transaction_Instance,
	P2P_Transaction_Instance,
	Help_Center_Instance,
	Withdrawal_Instance,
	Request_Money_Instance,
} from "./config/Build_Instance.MongoDB.config.db"; // Import All Instances

// Link All Instances as MongoInstances
export default {
	ClientAccount: Client_Account_and_Connection_Instance,
	ServerTransaction: Server_Transaction_Instance,
	P2PTransaction: P2P_Transaction_Instance,
	HelpCenter: Help_Center_Instance,
	Withdrawal: Withdrawal_Instance,
	RequestMoney: Request_Money_Instance,
}; // Export All Instances

// MongoDB Connection Function
export const ConnectDB = async () => {
	const DB_Connection_Status = await Client_Account_and_Connection_Instance.Connect(); // Connect to MongoDB

	DB_Connection_Status.status === true
		? Console.yellow(` 🚀 Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`)
		: Console.red(` 🚀 Database Connection Failed & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Server Status with Database Connection Status
};
