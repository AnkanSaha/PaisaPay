import { Mongo } from 'mongoland'; // Import the Mongo class
import { Database_Keys } from '../../keys/keys'; // Import the keys

// Import All Data Models
import ClientAccountDataModel from '../model/Client Account Data Model'; // Import the client account data model
import TransactionDataModel from '../model/Transaction Data Model'; // Import the transaction data model


// Export the Mongo Instance for Connection & Client Account
export const Client_Account_and_Connection_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	NeverDisconnect: true,
	Schema: ClientAccountDataModel,
	CollectionName: Database_Keys.ClientAccountCollectionName,
}); // Create a new instance of Mongo



/* The code is creating a new instance of the `Mongo` class and assigning it to the
`Transaction_Instance` constant. This instance is configured with the following properties: */
export const Transaction_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	NeverDisconnect: true,
	Schema: TransactionDataModel,
	CollectionName: Database_Keys.TransactionCollectionName
}); // Create a new instance of Mongo for Transactions