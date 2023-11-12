import { Jwt } from 'jwt-destroy'; // import the JWT class from the package

//Import Keys
import { StringKeys } from '../settings/keys/KeysConfig.keys.settings'; // Import Keys

const JWT = new Jwt(StringKeys.JWT_SECRET); // create a new instance of the JWT class

// Export JWT
export default JWT; // Export JWT
