import { CryptoGraphy } from "outers"; // Import Outers

import { StringKeys } from "../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Create A Node Encrypt Class
export default new CryptoGraphy(StringKeys.JWT_SECRET); // Export Node Encrypt Class
