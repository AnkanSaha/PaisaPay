/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;

// Import Required Modules
// import { StringKeys } from '../../settings/keys/keys'; // Import HTTP Status Codes
import { Request } from 'express'; // Import Request from express
import fs from 'fs'; // Import fs
// Import Required Modules
import { Console, StatusCodes, Response as Serve } from 'outers'; // Import Console & Status Codes

// import Helpers
import { AccountExistenceChecker } from '../../Helper/Account Existence Checker'; // Import Account Existence Checker
import MongoDB from '../../settings/MongoDB/MongoDB'; // Import MongoDB Instance

// Import Interfaces
import { ResponseInterface } from '../../Helper/Incoming Request Checker'; // Import Response Interface

// Request Interface
interface UpdateProfilePicture extends Request {
	file?: Express.Multer.File | any;
}

// Update Profile Picture
export async function UpdateProfilePicture(Request: UpdateProfilePicture, Response: ResponseInterface) {
	try {
		const { ClientID, PhoneNumber, Email } = Request.body; // Get ClientID, PhoneNumber & Email from Request Body

		// Check if No Data Send By User
		if (
			ClientID === undefined ||
			PhoneNumber === undefined ||
			Email === undefined ||
			Request.file === undefined ||
			ClientID === '' ||
			PhoneNumber === '' ||
			Email === '' ||
			Request.file === ''
		) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: 'Bad Request',
				message: 'Please send all required data',
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
				Title: 'Account Not Found',
				message: 'Account does not exist',
				data: undefined,
			});
			await fs.promises.rm(Request.file.path); // Delete the file
			return; // Return
		}

		// Delete Previous Profile Picture
		await fs.promises.rm(AccountStatus.Information.Data[0].ProfilePicturePath); // Delete Previous Profile Picture

		// Update Profile Picture in Database
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
				Title: 'Unable to Update Profile Picture',
				message: 'Unable to Update Profile Picture. Please try again later',
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
			Title: 'Success',
			message: 'Profile Picture Updated Successfully, it will take some time to reflect the changes',
			data: {
				ProfilePicFileName: Request.file.filename,
			},
		}); // Send Response to Client
	} catch (error) {
		Console.red(error);
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: 'Internal Server Error',
			message: 'Something went wrong while updating your profile picture. Please try again later',
			data: undefined,
		});
	}
}
