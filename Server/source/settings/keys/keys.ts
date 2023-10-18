/* eslint-disable no-undef */

import {config} from 'dotenv'; // Config environment variables
config(); // Load environment variables

// Export keys
export enum NumberKeys {
	PORT= Number(process.env.PORT) || 5412,
}

// Export keys
export const StringKeys = {
    AppName: String('PaisaPay'),
	CORS_URL: String(process.env.CORS_ORIGIN) || '*',
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) || '30d',
    StaticDirectoryName : String('Database'),
};

export const Database_Keys = {
    MongoDB: String(process.env.MONGODB_URL),
    ClientAccountCollectionName: String('ClientAccount'),
    ServerTransactionCollectionName: String('ServerTransactionDetail'),
    P2PTransactionCollectionName: String('P2PTransactionDetail'),
    HelpCenterCollectionName: String('HelpCenterDetail'),
    WithdrawalCollectionName: String('WithdrawalDetail'),
}

// Payment Related Keys
export const Payment_Keys = {
    MERCHANT_ID: String(process.env.RAZORPAY_MERCHANT_ID),
}