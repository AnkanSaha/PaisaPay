// Global Types
type str = string;
type int = number;
type bool = boolean;

// Import Required Modules
import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import HTTP Status Codes
import JWT from "../../Middleware/JWT.middleware"; // Import JWT Config
import { Request,Response } from "express"; // Import Request from express
// Import Required Modules
import { Console, StatusCodes, Serve, methods } from "outers"; // Import Console & Status Codes

// import Helpers
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Config
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Interfaces for Login
interface LoginRequestInterface extends Request {
	body: {
		PhoneNumber: int;
		Password: str;
		LastLoginIP: str;
		LastLoginClientDetails: unknown;
	};
}

// Interface for is Password Correct
interface isPasswordCorrectInterface {
	isMatch?: bool;
	status?: bool;
	statusCode?: int;
}

// Function for Login
/**
 * The function Login_PaisaPay is used to handle the login process for the PaisaPay application,
 * including password validation and generating a JWT token.
 * @param {LoginRequestInterface} request - The `request` parameter is an object that contains the data
 * sent in the HTTP request. It includes properties such as `PhoneNumber`, `Password`, `LastLoginIP`,
 * and `LastLoginClientDetails`.
 * @param {ResponseInterface} Response - The `Response` parameter is the response object that will be
 * sent back to the client. It is used to send the response data such as status code, message, and
 * data.
 */
export const Login_PaisaPay = async (request: LoginRequestInterface, Response: Response) => {
	try {
		const { PhoneNumber, Password, LastLoginIP, LastLoginClientDetails } = request.body; // Destructure the request body

		if (!PhoneNumber || !Password || !LastLoginIP || !LastLoginClientDetails) {
			Serve.JSON({
				data: undefined,
				Title: "Information Missing in Request",
				message: "Please provide all the required information & try again",
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				response: Response,
				cookieData: undefined,
			});
			return; // Return if the request body is invalid
		} else {
			// Decrypt All Credentials
			const DecryptedPhoneNumber = PhoneNumber; // Decrypt Phone Number
			const DecryptedPassword = Password; // Decrypt Password
			const DecryptedLastLoginIP = LastLoginIP; // Decrypt Last Login IP
			const DecryptedLastLoginClientDetails = JSON.parse(String(LastLoginClientDetails)); // Decrypt Last Login Client Details

			const AccountStatus = await MongoDB.ClientAccount.find("OR", [{ PhoneNumber: DecryptedPhoneNumber }], 1); // Find the account in the database

			// Check if the account exists
			if (AccountStatus.count === 0) {
				Serve.JSON({
					status: false,
					statusCode: StatusCodes.NOT_FOUND,
					Title: "Not Found",
					message: "Account not found, please try again with the correct phone number",
					data: undefined,
					response: Response,
					cookieData: undefined,
				});
				return; // Return if Account Not Find
			}
			
			// Check if Account is Deleted or Not
			if(AccountStatus.Data[0].AccountStatus === 'Deleted'){
				Serve.JSON({
					response: Response,
					status:false,
					statusCode:StatusCodes.LOCKED,
					Title: "Account is Deleted",
					message: "Your account is deleted, please contact the support team for further assistance or create a new account",
					data:undefined,
					cookieData: undefined,
				})
				return; // Return if Account is Deleted
			}

				const isPasswordCorrect: isPasswordCorrectInterface = await Compare(DecryptedPassword, AccountStatus.Data[0].Password); // Compare the password
				if (isPasswordCorrect.isMatch === false) {
					Serve.JSON({
						status: false,
						statusCode: StatusCodes.UNAUTHORIZED,
						Title: "Unauthorized",
						message: "Incorrect Password, please try again with the correct password",
						data: undefined,
						response: Response,
						cookieData: undefined,
					});
					return; // Return if Password is Incorrect
				}
				// Remove Password from the Account Details
					AccountStatus.Data[0].Password = undefined; // Remove Password from the Account Details
					AccountStatus.Data[0].TransactionPIN = undefined; // Remove Transaction PIN from the Account Details
					AccountStatus.Data[0].National_ID_Number = undefined; // Remove National ID Number from the Account Details
					AccountStatus.Data[0].LastLoginToken = undefined; // Remove Last Login Token from the Account Details

					// Encrypt Account Details if you want to send it to the user
					const EncryptedaccountDetails = AccountStatus.Data[0]; // Generate JWT Token for Account Details

					// Register Login Token Round Generator
					const Generator = new methods.UniqueGenerator(1); // Create a new Unique Generator

					// Generate Login Token
					const LoginToken = await JWT.generateLoginToken(
						{
							ClientID: AccountStatus.Data[0].ClientID,
							LastLoginIP: DecryptedLastLoginIP,
							LastFourDigitsOfIDNumber: AccountStatus.Data[0].LastFourDigitsOfIDNumber,
						},
						Generator.RandomNumber(false, [4, 5, 6, 7]),
						StringKeys.JWT_EXPIRES_IN
					); // Generate Login Token for the user

					// Update Last Login IP and Last Login Client Details
					const ToBeUpdateOptions = {
						LastLoginTime: Date.now(),
						LastLoginIP: DecryptedLastLoginIP,
						LastLoginClientDetails: DecryptedLastLoginClientDetails,
						LastLoginToken: LoginToken.toKen,
					}; // Options to be updated

					// Update the account details in the database with the new login details
					await MongoDB.ClientAccount.update(
						[{ PhoneNumber: DecryptedPhoneNumber }, { ClientID: AccountStatus.Data[0].ClientID }],
						{ $set: ToBeUpdateOptions },
						false
					);

					// Send Response
					Serve.JSON({
						status: true,
						statusCode: StatusCodes.OK,
						Title: "Login Successful",
						message: "You have successfully logged in, please wait while we redirect you to your dashboard",
						data: {
							sessionID: LoginToken.toKen,
							AccountDetails: EncryptedaccountDetails,
						},
						response: Response,
						cookieData: undefined,
					}); // Send Response to the user
		}
	} catch (err) {
		Console.red(err); // Log the error to the console
		Serve.JSON({
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "An error occurred while processing your request, please try again later",
			data: undefined,
			response: Response,
			cookieData: undefined,
		});
	}
};
