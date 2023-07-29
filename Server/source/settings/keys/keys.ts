/* eslint-disable no-undef */

import {config} from 'dotenv'; // Config environment variables
import {green} from 'outers'; // Colorful console.log
config(); // Load environment variables

green('Environment variables loaded successfully!'); // Print success message

// Export keys
export enum NumberKeys {
	PORT= Number(process.env.PORT) || 5412,
}

// Export keys
export const StringKeys = {
	MongoDB: String(process.env.MONGODB_URL),
	CORS_URL: String(process.env.CORS_ORIGIN) || '*',
};
