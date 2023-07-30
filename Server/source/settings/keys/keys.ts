/* eslint-disable no-undef */

import {config} from 'dotenv'; // Config environment variables
config(); // Load environment variables

// Export keys
export enum NumberKeys {
	PORT= Number(process.env.PORT) || 5412,
}

// Export keys
export const StringKeys = {
	MongoDB: String(process.env.MONGODB_URL),
	CORS_URL: String(process.env.CORS_ORIGIN) || '*',
};
