/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
// type str = string;

// Import Required Modules
import { Request, Response } from "express"; // Import Request from express

// Import Required Modules
import { Console, StatusCodes, Serve } from "outers"; // Import Console & Status Codes
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Middleware

// Import Helper
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Main Function
export async function AccountActivationDeactivationManagement(Request: Request, Response: Response) {
	try {
		// Check if Account Exists with this ClientID
		const AccountDetails = await MongoDB.ClientAccount.findAndCount("AND", [{ ClientID: Request.query.ClientID }]); // Check if Account Exists with this ClientID

		// Check if Account Exists
		if (AccountDetails.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "Account with this ClientID does not exists, Please check your ClientID",
				data: undefined,
			}); // Send Response
			return;
		}

		// Check if TPIN Code is Correct
		if ((await Compare(String(Request.query.TPIN), AccountDetails.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.UNAUTHORIZED,
				Title: "Unauthorized",
				message: "TPIN Code is incorrect, Please check your TPIN Code and try again",
				data: undefined,
			}); // Send Response
			return;
		}

		// Check if Requested Action Already Done or Not
		if (String(Request.query.AccountStatus).toLowerCase() === AccountDetails.Data[0].AccountStatus.toLowerCase()) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.ALREADY_REPORTED,
				Title: "Bad Request",
				message: `Account is already ${AccountDetails.Data[0].AccountStatus}, Please check your Account Status and try again`,
				data: undefined,
			}); // Send Response
			return;
		}

		// Update Account Status in Database
		const UpdateStatus = await MongoDB.ClientAccount.update(
			[{ ClientID: Request.query.ClientID }],
			{ AccountStatus: String(Request.query.AccountStatus) },
			false
		); // Update Account Status in Database

		// Remove Useless Data from Update Result
		const ToBeRemoved: string[] = ["Password", "TransactionPIN", "National_ID_Type", "National_ID_Number", "LastFourDigitsOfIDNumber", "LastLoginClientDetails", "LastLoginToken", "TPIN", "LastLoginIP"]; // Data To Be Removed
		
		// Remove Data From Update Result one by one with forEach
		ToBeRemoved.forEach(key => AccountDetails.Data[0][key] = undefined); // Remove Data From Update Result one by one with forEach

		if (UpdateStatus.UpdatedCount !== 0 && UpdateStatus.status === true) {
			Serve.JSON({
				response: Response,
				status: true,
				statusCode: StatusCodes.OK,
				Title: "Account Status Updated",
				message: `Account Status Updated to ${String(Request.query.AccountStatus)} Successfully`,
				data: { sessionID: AccountDetails.Data[0].LastLoginToken, AccountDetails: AccountDetails.Data[0] },
			}); // Send Response
			return;
		}

		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.MISDIRECTED_REQUEST,
			Title: "Account Status Not Updated",
			message: "Something went wrong, Please try again later",
			data: undefined,
		}); // Send Response
	} catch (error) {
		Console.red(error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong",
			data: undefined,
		}); // Send Response
	}
}
