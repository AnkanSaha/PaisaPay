/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
// type bool = boolean;
type int = number;

// Import Required Modules
import { Request, Response } from "express"; // Import Request from express
import { Console, StatusCodes, Serve } from "outers"; // Import Console & Status Codes
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Compare Function
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Client

// interfaces
interface DecryptedData {
	NewEmail: str;
	NewPhoneNumber: int;
	NewDOB: Date;
	Name: str;
	ClientID: int;
	OldEmail: str;
	OldPhoneNumber: int;
	TPIN: str;
}

export default async function UpdateDemographicInfo(Request: Request, Response: Response) {
	try {
		const Decrypted_Info: DecryptedData = Request.body.Encrypted_Info; // Decrypt The Info
		// Short Data
		const ShortData = {
			OldEmail: Decrypted_Info.OldEmail.toLowerCase(),
			NewEmail: Decrypted_Info.NewEmail.toLowerCase(),
		};

		// Find the User Account
		const AccountDetails = await AccountExistenceChecker(Decrypted_Info.OldPhoneNumber, ShortData.OldEmail); // Check If Account Exists
		if (AccountDetails.Information.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "The Account You Are Trying To Update Does Not Exist, Please Create An Account",
				data: undefined,
			}); // Serve JSON
			return;
		}

		// Check If The Account Is Active
		if (AccountDetails.Information.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.FORBIDDEN,
				Title: `Account is ${AccountDetails.Information.Data[0].AccountStatus}`,
				message: `The Account You Are Trying To Update Is ${AccountDetails.Information.Data[0].AccountStatus}, Please Activate Your Account`,
				data: undefined,
			}); // Serve JSON
			return;
		}

		// Check if TPIN is correct
		if ((await Compare(Decrypted_Info.TPIN, AccountDetails.Information.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.UNAUTHORIZED,
				Title: "Invalid TPIN",
				message: "The TPIN You Entered Is Invalid, Please Try Again",
				data: undefined,
			}); // Serve JSON
			return;
		} // Compare TPIN

		// Check the if Mobile Number is not using another account
		const MobileNumberStatus = await MongoDB.ClientAccount.findAndCount("AND", [{ PhoneNumber: Decrypted_Info.NewPhoneNumber }]); // Check If Mobile Number Is In Use
		if (MobileNumberStatus.count > 1) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.CONFLICT,
				Title: "Mobile Number In Use",
				message: "The Mobile Number You Entered Is Already In Use with multiple accounts, Please Try Again",
				data: undefined,
			}); // Serve JSON
			return;
		} // Check If Mobile Number Is In Use
		else if (MobileNumberStatus.count === 1 && MobileNumberStatus.Data[0].ClientID !== Decrypted_Info.ClientID) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.CONFLICT,
				Title: "Mobile Number In Use",
				message: "The Mobile Number You Entered Is Already In Use, Please Try Again",
				data: undefined,
			}); // Serve JSON
			return;
		} // Check If Mobile Number Is In Use

		// Check the if Email Address is not using another account
		const EmailAddressStatus = await MongoDB.ClientAccount.findAndCount("AND", [{ Email: Decrypted_Info.NewEmail }]); // Check If Email Address Is In Use
		if (EmailAddressStatus.count > 1) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.CONFLICT,
				Title: "Email Address In Use",
				message: "The Email Address You Entered Is Already In Use with multiple accounts, Please Try Again",
				data: undefined,
			}); // Serve JSON
			return;
		} // Check If Email Address Is In Use
		else if (EmailAddressStatus.count === 1 && EmailAddressStatus.Data[0].ClientID !== Decrypted_Info.ClientID) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.CONFLICT,
				Title: "Email Address In Use",
				message: "The Email Address You Entered Is Already In Use, Please Try Again",
				data: undefined,
			}); // Serve JSON
			return;
		} // Check If Email Address Is In Use

		// Update The Account Details In The Database
		const ToBeUpdate = {
			Email: Decrypted_Info.NewEmail,
			PhoneNumber: Decrypted_Info.NewPhoneNumber,
			DOB: new Date(Decrypted_Info.NewDOB),
			Name: Decrypted_Info.Name,
		};

		// Update The Account Details In The Database
		const UpdateStatus = await MongoDB.ClientAccount.update(
			[{ ClientID: Decrypted_Info.ClientID }, { Email: ShortData.OldEmail }, { PhoneNumber: Decrypted_Info.OldPhoneNumber }],
			ToBeUpdate,
			false
		); // Update The Account Details In The Database

		// Check If The Update Was Successful
		if (UpdateStatus.UpdatedCount === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				Title: "Internal Server Error",
				message: "An Error Occurred While Updating Your Demographic Info, Please Try Again Later",
				data: undefined,
			}); // Serve JSON
			return;
		}

		// Remove Useless Data from Update Result
		const ToBeRemoved: string[] = ["Password", "TransactionPIN", "National_ID_Type", "National_ID_Number", "LastFourDigitsOfIDNumber", "LastLoginClientDetails", "LastLoginToken", "TPIN", "LastLoginIP"]; // Data To Be Removed
		
		// Remove Data From Update Result one by one with forEach
		ToBeRemoved.forEach(key => UpdateStatus.UpdatedData[key] = undefined); // Remove Data From Update Result one by one with forEach

		// Serve JSON Response To The Client
		Serve.JSON({
			response: Response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: "Successfully Updated Demographic Info",
			message: "Your Demographic Info Has Been Successfully Updated, You Can Now Continue To Use Our Services",
			data: {
				sessionID: UpdateStatus.UpdatedData.LastLoginToken,
				AccountDetails: UpdateStatus.UpdatedData,
			},
		}); // Serve JSON
	} catch (error) {
		Console.red(error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "An Error Occurred While Updating Your Demographic Info, Please Try Again Later",
			data: undefined,
		}); // Serve JSON
	}
}
