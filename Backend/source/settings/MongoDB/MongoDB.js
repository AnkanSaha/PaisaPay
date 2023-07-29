import { Mongo } from "mongoland"; // import the Mongo class
import {StringKeys} from '../keys/keys.js'; // import the keys

// Export the Mongo Instance for Connection
export const ConnectMongoInstance = new Mongo({
    MongoURL:StringKeys.MongoDB,
    NeverDisconnect:true,
    Schema:{
        Name:String,
        Age:Number
    },
    CollectionName:"PaisaPay"
}); // create a new instance of Mongo