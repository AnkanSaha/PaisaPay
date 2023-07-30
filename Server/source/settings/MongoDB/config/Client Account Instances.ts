import {Mongo} from 'mongoland'; // Import the Mongo class
import {Database_Keys} from '../../keys/keys'; // Import the keys
import DataModel from '../model/Client Account Data Model'; // Import the Data Model

// Export the Mongo Instance for Connection
export const Client_Account_and_Connection_Instance = new Mongo({
	MongoURL: Database_Keys.MongoDB,
	NeverDisconnect: true,
	Schema: DataModel,
	CollectionName: Database_Keys.ClientAccountCollectionName,
}); // Create a new instance of Mongo
