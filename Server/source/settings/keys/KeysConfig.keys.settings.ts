/* eslint-disable no-undef */

import { config } from "dotenv"; // Config environment variables
config(); // Load environment variables
import { cpus, platform, freemem, arch } from "os"; // Import OS

// Export keys
export enum NumberKeys {
	PORT = Number(process.env.PORT) || 5412,
	// CPU Count
	CPUCount = Number(process.env.CPU_COUNT_MULTIPLIERENV) ?? cpus().length,
}

// Export keys
export const StringKeys = Object.freeze({
	AppName: String("PaisaPay"),
	CORS_URL: String(process.env.CORS_ORIGIN) ?? "*",
	JWT_SECRET: String(process.env.JWT_SECRET),
	JWT_FieldName: "sessionID",
	JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) ?? "30d",
	StaticDirectoryName: String("Database"),
	// Server Details
	Platform: String(platform()),
	Architecture: String(arch()),
	FreeRam: Number((freemem() / 1024 / 1024 / 1024).toFixed(2)),
	Model: String(cpus()[0].model),
	IP_INFO_API_KEY: String(process.env.IP_INFO_API_KEY),
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

// All Variables for CORS
export const All_AllowedHeadersInCORS: string[] = [
	"Content-Type",
	"Authorization",
	"X-Requested-With",
	"Accept",
	"Origin",
	"Access-Control-Allow-Headers",
	"Access-Control-Allow-Origin",
	"Access-Control-Allow-Methods",
	"Access-Control-Allow-Credentials",
]; // AllowedHeaders is an array of headers that are allowed in a request.

export const All_exposedHeadersInCORS: string[] = [
	"Content-Type",
	"Authorization",
	"X-Requested-With",
	"Accept",
	"Origin",
	"Access-Control-Allow-Headers",
	"Access-Control-Allow-Origin",
	"Access-Control-Allow-Methods",
	"Access-Control-Allow-Credentials",
]; // ExposedHeaders indicates which headers are safe to expose to the API of a CORS API specification

// All Variables for send response
export const AllowedMethods: string[] = ["POST", "GET", "PUT", "DELETE", "OPTIONS"]; // Allowed Methods
