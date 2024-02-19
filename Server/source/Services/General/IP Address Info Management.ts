// Global Type Declarations
type str = string; // Type Declaration for string
type obj = object; // Type Declaration for object

import { Request, Response } from "express"; // Import Request from express
import { Console, StatusCodes, Serve, methods } from "outers"; // Import red from outers
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import Keys

// Start Storage Instance for IP Address Cache Management
const IPstorage = new methods.Storage.CreateNewShortStorage(
	"IP_Cache",
	500,
	`${StringKeys.AppName}${StringKeys.JWT_SECRET}${StringKeys.IP_INFO_API_KEY}`
); // Start Storage Instance for IP Address Cache Management

export default async function IPAddressInfoService(request: Request, response: Response) {
	try {
		// Extract Client IP Address
		const ClientIP: str = String(request.headers["x-forwarded-for"]); // Get Client IP Address

		// Check if Client IP Address is cached or not
		const IPCacheDetails = await IPstorage.Get(ClientIP); // Get IP Cache Details

		// Check if Client IP Address is cached or not if it is cached then return it
		if (IPCacheDetails.status == StatusCodes.OK) {
			Serve.JSON({
				response: response,
				status: true,
				statusCode: StatusCodes.OK,
				Title: "Success",
				message: "Your IP Address & IP Details is here.",
				data: {
					...IPCacheDetails.Data[0].Data,
					origin: `${StringKeys.AppName}'s Cache Server`,
				},
			});
			return; // Return if IP Address is cached
		}

		// Create IP Info API URL
		const IPInfo_API_URL: str = `https://ipinfo.io/${ClientIP}/json?token=${StringKeys.IP_INFO_API_KEY}`; // Create IP Info API URL

		// Get Client IP Address Info from IP Address Lookup API
		const IPData = await (await fetch(IPInfo_API_URL)).json(); // Get Client IP Address Info from IP Address Lookup API

		// Check if Error or not
		if (IPData.status) {
			Serve.JSON({
				response: response,
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				Title: "Currently IP Not Available",
				message: "Currently, we can't find your IP Address. Please try again later.",
				data: undefined,
			});
			return; // Return if Error
		}

		// Collect Client IP Address Info from IP Address Lookup API
		const Fetched_ClientIP_Details: obj = {
			IP: ClientIP,
			Details: IPData,
			Version: IPChecker(ClientIP), // Send IP Address & IP Details to check IPv4 or IPv6
			origin: "IP Address Lookup API Server",
		};

		// Store IP Address & IP Details in Storage
		await IPstorage.Save(ClientIP, Fetched_ClientIP_Details); // Store IP Address & IP Details in Storage

		// Send IP Details to Client
		Serve.JSON({
			response: response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: "Success",
			message: "Your IP Address & IP Details is here.",
			data: Fetched_ClientIP_Details,
		});
	} catch (error) {
		Console.red(error); // Log Error
		Serve.JSON({
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Internal Server Error",
			response: response,
			data: undefined,
		});
	}
}

// Check if IP is IPv4 or IPv6 address
export function IPChecker(CurrentIP: str) {
	try {
		// Regular expressions for IPv4 and IPv6 addresses
		const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
		const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

		// Check if the IP address matches IPv4 or IPv6 regex
		if (ipv4Regex.test(CurrentIP)) {
			return "IPv4";
		} else if (ipv6Regex.test(CurrentIP)) {
			return "IPv6";
		} else {
			return new Error("Invalid IP address");
		}
	} catch (error) {
		// If any error occurs, reject the Promise with the error
		return error;
	}
}
