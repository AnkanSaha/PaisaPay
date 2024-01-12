import { Request, NextFunction } from "express"; // Import Request from express

// Import Interfaces
import { ResponseInterface } from "../utils/Incoming.Req.Check.utils"; // Import Response Interface
import { Console, Response as Serve, StatusCodes } from "outers"; // Import red from outers

// main function
export default async (Request: Request, Response: ResponseInterface, Next: NextFunction) => {
	// Allow only PUT, POST, PATCH, DELETE methods
	const AllowedMethods = ["PUT", "POST", "PATCH", "DELETE"]; // Allowed Methods

	try {
		// Check if Request Method is Allowed
		if (AllowedMethods.includes(Request.method)) {
			const RequesterIPaddress: string =
				String(Request.headers["x-forwarded-for"]) || String(Request.connection.remoteAddress) || String(Request.socket.remoteAddress) || String(Request.socket.remoteAddress); // Get Requester IP Address
          Request.body["RequesterIPaddress"] = RequesterIPaddress; // Inject Requester IP Address
			Next(); // Next Middleware
		}
	} catch (Error) {
		Console.red(Error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			Title: "Cannot Process Request",
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: "Something went wrong while processing your request. Please try again later.",
			data: undefined,
		});
	}
}; // Export main function
