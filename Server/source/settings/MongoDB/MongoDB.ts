import {Mongo} from 'mongoland'; // Import the Mongo class
import {StringKeys} from '../keys/keys'; // Import the keys

// Export the Mongo Instance for Connection
export const ConnectMongoInstance = new Mongo({
	MongoURL: StringKeys.MongoDB,
	NeverDisconnect: true,
	Schema: {
		Name: String,
		Age: Number,
	},
	CollectionName: 'PaisaPay',
}); // Create a new instance of Mongo
