// Global Type Declarations
type str = string; // Type Declaration for string

import { Request, Response } from "express"; // Import Request from express
import { Console, StatusCodes, Serve, methods } from "outers"; // Import red from outers

// Import Helpers
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Import Interfaces
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker

// Interface for Request
interface RequestInterface extends Request {
	body: {
		TicketTitle?: str;
		TicketDescription?: str;
		ClientID?: str;
		CurrentClientDetails?: object;
	};
}

/**
 * The HelpCenterService function handles the creation of a ticket in a help center system, validating
 * the request body and saving the ticket data to a database.
 * @param {RequestInterface} request - The `request` parameter is an object that contains the incoming
 * HTTP request data. It includes information such as the request method, headers, URL, and body.
 * @param {ResponseInterface} response - The `response` parameter is an object that represents the HTTP
 * response that will be sent back to the client. It is used to send the response data, status code,
 * and headers back to the client.
 * @returns The function does not explicitly return anything. However, it sends a JSON response using
 * the `JSONSendResponse` function. The response includes data such as the status, message, and
 * statusCode.
 */
export default async function HelpCenterService(request: RequestInterface, response: Response) {
	try {
		const { ClientID, TicketDescription, TicketTitle, CurrentClientDetails } = request.body; // Destructure the request body
		if (!ClientID || !TicketDescription || !TicketTitle || !CurrentClientDetails) {
			// Check if the request body is valid
			Serve.JSON({
				data: undefined,
				Title: "Information Missing in Request",
				message: "Please provide all the required information & try again",
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				response: response,
			});
			return; // Return if the request body is invalid
		} else {
			// Encrypt the request data
			const EncryptedTicketTitle = request.body.TicketTitle; // Encrypt the request Title
			const EncryptedTicketDescription = request.body.TicketDescription; // Encrypt the request data

			//  Register Ticket ID Generator
			const TicketIDGenerator = new methods.UniqueGenerator(15); // Create a new Unique ID Generator

			const RequestDataToBeSave = {
				ClientID: ClientID,
				TicketID: TicketIDGenerator.RandomNumber(true),
				TicketTitle: EncryptedTicketTitle,
				TicketDescription: EncryptedTicketDescription,
				TicketStatus: "Pending",
				CurrentClientDetails: CurrentClientDetails,
				RequestDate: Date.now(),
			}; // Create the request data to be saved

			// Save the request data to the database
			const DBResult = await MongoDB.HelpCenter.create(RequestDataToBeSave); // Save the request data to the database

			// Remove Some Useless Data
			DBResult.NewData[0].CurrentClientDetails = undefined; // Remove Client Details

			// Check if the request data was saved successfully
			if (DBResult.status === true) {
				Serve.JSON({
					data: DBResult.NewData[0],
					Title: "Ticket Created Successfully",
					message: "Your ticket has been created successfully, we will get back to you soon",
					status: true,
					statusCode: StatusCodes.CREATED,
					response: response,
				});
			} else {
				Serve.JSON({
					data: undefined,
					Title: "Ticket Creation Failed",
					message: "Your ticket could not be created, please try again",
					status: false,
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
					response: response,
				});
			}
		}
	} catch (error) {
		Console.red(error);
		Serve.JSON({
			data: undefined,
			Title: "Internal Server Error",
			message: "An error occurred while processing your request, please try again",
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			response: response,
		}); // Send an empty response
	}
}

// Get All Tickets
export const GetAllTickets = async (request: Request, response: Response) => {
	try {
		const { Email, PhoneNumber } = request.query; // Destructure the request body

		// Find the client data
		const ClientData = await AccountExistenceChecker(Number(PhoneNumber), String(Email)); // Check if the client exists
		
		// Check if the client exists
		if (ClientData.status === false) {
			Serve.JSON({
				data: undefined,
				Title: "Client Not Found",
				message: "The client with the provided details does not exist",
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				response: response,
			});
			return;
		}

		// Find the client tickets in the database
		const ClientAllTickets = await MongoDB.HelpCenter.find("AND", [{ ClientID: ClientData.Information.Data[0].ClientID }]); // Find the client tickets in the database

		// Check if the client has any tickets
		if (ClientAllTickets.count === 0) {
			Serve.JSON({
				data: undefined,
				Title: "No Tickets Found",
				message: "The client has not created any tickets yet",
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				response: response,
			});
			return;
		}
		// Encrypt All Tickets
		const EncryptedAllTickets = ClientAllTickets.Data; // Encrypt All Tickets
		
		// Remove Some Useless Data from Find Result
		EncryptedAllTickets[0].CurrentClientDetails = undefined; // Removed this from Find Result

		// Send the response
		Serve.JSON({
			data: EncryptedAllTickets,
			Title: "Tickets Found",
			message: "The client tickets were found successfully",
			status: true,
			statusCode: StatusCodes.OK,
			response: response,
		});
	} catch (error) {
		Console.red(error);
		Serve.JSON({
			data: undefined,
			Title: "Internal Server Error",
			message: "An error occurred while processing your request, please try again",
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			response: response,
		}); // Send an empty response
	}
};
