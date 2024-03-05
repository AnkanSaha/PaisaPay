// Global Type Declarations
type str = string; // Type Declaration for string
type obj = object; // Type Declaration for object

import { Request, Response } from "express"; // Import Request from express
import { Console, StatusCodes, Serve, FunctionBased } from "outers"; // Import red from outers
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import Keys

export default async function IPAddressInfoService(request: Request, response: Response) {
	try {
		// Extract Client IP Address
		const ClientIP: str =
		String(request.headers["x-forwarded-for"]) ||
		String(request.connection.remoteAddress) ||
		String(request.socket.remoteAddress) ||
		String(request.socket.remoteAddress) ||
		String(request.headers["x-real-ip"]) ||
		String(request.ip); // Get Requester IP Address; // Get Client IP Address

		// Get IP Details
		const IP_Details: obj = await FunctionBased.IP.Info(StringKeys.IP_INFO_API_KEY, ClientIP); // Get IP Details

		// Send IP Details to Client
		Serve.JSON({
			response: response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: "Success",
			message: "Your IP Address & IP Details is here.",
			data: IP_Details,
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