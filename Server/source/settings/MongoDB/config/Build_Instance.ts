import { Mongo } from 'mongosuper'; // Import the Mongo class
import { Database_Keys } from '../../keys/keys'; // Import the keys

// Import All Data Models
import ClientAccountModel from '../model/Client Account Model'; // Import the client account data model
import ServerTransactionModel from '../model/Server Transaction Model'; // Import the transaction data model
import P2PTransactionModel from '../model/P2P Transaction Model';
import HelpCenterModel from '../model/Help Center Model'; // Import the help center data model
import WithdrawalModel from '../model/Withdrawal Model'; // Import the withdrawal data model

// Export the Mongo Instance for Connection & Client Account creation
export const Client_Account_and_Connection_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	Database_Name: Database_Keys.DB_Name,
	NeverDisconnect: true,
	Schema: ClientAccountModel,
	CollectionName: Database_Keys.ClientAccountCollectionName,
	isTimeStamps: true,
}); // Create a new instance of Mongo

/* The code is creating a new instance of the `Mongo` class and assigning it to the
`Server_Transaction_Instance` constant. This instance is configured with the following properties: */
export const Server_Transaction_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	Database_Name: Database_Keys.DB_Name,
	NeverDisconnect: true,
	Schema: ServerTransactionModel,
	CollectionName: Database_Keys.ServerTransactionCollectionName,
	isTimeStamps: true,
}); // Create a new instance of Mongo for Store All Transaction Details between Server and Client like Deposit, Withdraw, etc.

export const P2P_Transaction_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	Database_Name: Database_Keys.DB_Name,
	NeverDisconnect: true,
	Schema: P2PTransactionModel,
	CollectionName: Database_Keys.P2PTransactionCollectionName,
	isTimeStamps: true,
}); // Create a new instance of Mongo for Store All Transaction Details between Client and Client like Send, Receive, etc.

export const Help_Center_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	Database_Name: Database_Keys.DB_Name,
	NeverDisconnect: true,
	Schema: HelpCenterModel,
	CollectionName: Database_Keys.HelpCenterCollectionName,
	isTimeStamps: true,
}); // Create a new instance of Mongo for Store All Help Center Details like TicketID, TicketTitle, etc.

export const Withdrawal_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	Database_Name: Database_Keys.DB_Name,
	NeverDisconnect: true,
	CollectionName: Database_Keys.WithdrawalCollectionName,
	Schema: WithdrawalModel,
	isTimeStamps: true,
}); // Create a new instance of Mongo for Store All Withdrawal Details like UserClientID, UserPaymentID, etc.
