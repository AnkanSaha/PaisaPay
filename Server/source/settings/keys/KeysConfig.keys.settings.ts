/* eslint-disable no-undef */

import { config } from "dotenv"; // Config environment variables
config(); // Load environment variables
import { cpus, platform, freemem, arch } from "os"; // Import OS

// Export keys
export enum NumberKeys {
	PORT = Number(process.env.PORT) || 5412,
	// CPU Count
	CPUCount = cpus().length * Number(process.env.CPU_COUNT_MULTIPLIERenv) || 2,
}

// Export keys
export const StringKeys = Object.freeze({
	AppName: String("PaisaPay"),
	CORS_URL: String(process.env.CORS_ORIGIN) || "*",
	JWT_SECRET: String(process.env.JWT_SECRET),
	JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) || "30d",
	StaticDirectoryName: String("Database"),
	// Server Details
	Platform: String(platform()),
	Architecture: String(arch()),
	FreeRam: Number((freemem() / 1024 / 1024 / 1024).toFixed(2)),
	Model: String(cpus()[0].model),
}); // Immutable Keys

export const Database_Keys = Object.freeze({
	MongoDB: String(process.env.MONGODB_URL),
	DB_Name: String(process.env.DB_NAME),
	ClientAccountCollectionName: String("ClientAccount"),
	ServerTransactionCollectionName: String("ServerTransactionDetail"),
	P2PTransactionCollectionName: String("P2PTransactionDetail"),
	HelpCenterCollectionName: String("HelpCenterDetail"),
	WithdrawalCollectionName: String("WithdrawalDetail"),
	RequestMoneyCollectionName: String("RequestMoneyDetail"),
}); // Immutable Keys

// Payment Related Keys
export const Payment_Keys = Object.freeze({
	MERCHANT_ID: String(process.env.RAZORPAY_MERCHANT_ID),
}); // Immutable Keys