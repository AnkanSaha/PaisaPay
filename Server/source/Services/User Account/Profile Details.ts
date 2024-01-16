/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
type int = number;

// Import Required Modules
import { Request, Response } from "express"; // Import Request from express
import fs from "fs"; // Import fs
// Import Required Modules
import { Console, StatusCodes, Serve } from "outers"; // Import Console & Status Codes
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Middleware

// import Helpers
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Request Interface
interface UpdateProfilePicture extends Request {
	file?: Express.Multer.File | any;
}

// Update Profile Picture
export async function UpdateProfilePicture(Request: UpdateProfilePicture, Response: Response) {
	try {
		const { ClientID, PhoneNumber, Email, TransactionPIN } = Request.body; // Get ClientID, PhoneNumber & Email from Request Body

		// Check if No Data Send By User
		if (
			ClientID === undefined ||
			PhoneNumber === undefined ||
			Email === undefined ||
			Request.file === undefined ||
			ClientID === "" ||
			PhoneNumber === "" ||
			Email === "" ||
			Request.file === "" ||
			TransactionPIN === undefined
		) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Bad Request",
				message: "Please send all required data",
				data: undefined,

			});
			await fs.promises.rm(Request.file.path); // Delete the file
			return; // Return
		}

		// Short the Email ID
		const ShortedEmail: str = Email.toLowerCase(); // Short the Email ID

		// Check if Account Exists
		const AccountStatus = await AccountExistenceChecker(PhoneNumber, ShortedEmail); // Check if Account Exists

		if (AccountStatus.Information.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "Account does not exist",
				data: undefined,

			});
			await fs.promises.rm(Request.file.path); // Delete the file
			return; // Return
		}

		// Check If Sender Account Is Active
		if (AccountStatus.Information.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: `Your Account Is ${AccountStatus.Information.Data[0].AccountStatus}, Please Contact Support`,
				Title: "Account Not Active",
				data: undefined,
				response: Response,

			}); // Send Error Response
			await fs.promises.rm(Request.file.path); // Delete the file
			return;
		}

		// Check if Transaction PIN is Correct

		if ((await Compare(TransactionPIN, AccountStatus.Information.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: "Transaction PIN is Incorrect, Please try again with correct PIN",
				Title: "Transaction PIN Incorrect",
				data: undefined,
				response: Response,

			}); // Send Error Response
			await fs.promises.rm(Request.file.path); // Delete the file
			return;
		}

		// Delete Previous Profile Picture
		try {
			await fs.promises.access(AccountStatus.Information.Data[0].ProfilePicturePath); // Check if File Exists
			await fs.promises.rm(AccountStatus.Information.Data[0].ProfilePicturePath); // Delete Previous Profile Picture if Exists
			UpdateProfileDetails(ClientID, PhoneNumber, ShortedEmail, Request, Response); // Update Profile Details Function To Update Records in Database
			
		} catch (error) {
			Console.red(error); // Log Error
			UpdateProfileDetails(ClientID, PhoneNumber, ShortedEmail, Request, Response); // Update Profile Details Function To Update Records in Database
		}
	} catch (error) {
		await fs.promises.rm(Request.file.path); // Delete the file
		Console.red(error);
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong while updating your profile picture. Please try again later",
			data: undefined,

		});
	}
}

// Update Profile Details Function To Update Records in Database
async function UpdateProfileDetails(ClientID: int, PhoneNumber : str, ShortedEmail: str, Request: UpdateProfilePicture, Response: Response) {
	// Update Profile Picture in Database if File Exists
	const UpdateStatus = await MongoDB.ClientAccount.update(
		[{ ClientID: ClientID }, { Email: ShortedEmail }, { PhoneNumber: PhoneNumber }],
		{ ProfilePicFileName: Request.file.filename, ProfilePicturePath: Request.file.path, ProfilePicSize: Request.file.size },
		false
	); // Update Profile Picture in Database

	if (UpdateStatus.UpdatedCount === 0) {
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.NOT_ACCEPTABLE,
			Title: "Unable to Update Profile Picture",
			message: "Unable to Update Profile Picture. Please try again later",
			data: undefined,

		}); // Send Response to Client
		await fs.promises.rm(Request.file.path); // Delete the file
		return; // Return
	}

	// Send Response to Client
	Serve.JSON({
		response: Response,
		status: true,
		statusCode: StatusCodes.OK,
		Title: "Success",
		message: "Profile Picture Updated Successfully, it will take some time to reflect the changes",
		data: {
			ProfilePicFileName: Request.file.filename,
		},

	}); // Send Response to Client
}