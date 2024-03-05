/* eslint-disable @typescript-eslint/no-explicit-any */
// Date Created: 9/18/2020, 10:00:00 PM
type str = string; // Define str

// Imports
// Import Required Modules
import { Console, Serve, StatusCodes} from "outers";
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import HTTP Status Codes
import JWT from "../../Middleware/JWT.middleware"; // Import JWT Config
import { Request, Response } from "express"; // Import Request from express
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Function  for forget password Account Details Sender
export const GetAccountDetails = async (request: Request, response: Response) => {
	try {
		const { Email } = request.query; // Destructure the request body
		// Convert Email to lowercase
		const SmelledEmail = String(Email).toLowerCase(); // Convert Email to lowercase

		const AccountDetails = await MongoDB.ClientAccount.find("AND", [{ Email: SmelledEmail }], 1);

		// Check if Account Details is Empty or not
		if (AccountDetails.count === 0) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				message: "Account Not Found with this Email or Phone Number",
				Title: "Account Not Found",
				data: undefined,
				response: response,
			}); // Send Response to the Client
			return;
		}

		// Encrypt the Data and send it Using JWT
		const LoginToken = JWT.generate(
			{
				ClientID: AccountDetails.Data[0].ClientID,
				LastFourDigitsOfIDNumber: AccountDetails.Data[0].LastFourDigitsOfIDNumber,
			},
			StringKeys.JWT_EXPIRES_IN
		);
		// Generate Login Token for the user

		const EncryptedData = AccountDetails.Data[0]; // Encrypt the Data and send it Using JWT

		// Remove Password from the Account Details
		const ToBeRemoved: str[] = ["Password", "TransactionPIN", "National_ID_Number", "LastLoginToken"]; // Tease are to be removed
		ToBeRemoved.forEach(key => (EncryptedData[key] = undefined)); // Remove all Selected Data

		// Send Response to the Client
		Serve.JSON({
			status: true,
			statusCode: StatusCodes.OK,
			message: "Account Details Matched Successfully",
			Title: "Account Details",
			data: {
				sessionID: LoginToken.toKen,
				AccountDetails: EncryptedData,
			},
			response: response,
		});
	} catch (error) {
		Console.red(error); // Log the error to the console
		Serve.JSON({
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
			Title: "Internal Server Error",
			data: undefined,
			response: response,
		});
	}
};
