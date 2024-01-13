/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
type bool = boolean;
type int = number;

// Import Required Modules
import { Request } from "express"; // Import Request from express
// Import Required Modules
import { Console, StatusCodes, Response as Serve, UniqueGenerator } from "outers"; // Import Console & Status Codes
import { Compare, Encrypt as Bcrypt } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Middleware

// import Helpers
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Import Interfaces
import { ResponseInterface } from "../../utils/Incoming.Req.Check.utils"; // Import Response Interface

// Inter\face for Password Encryption
interface PasswordEncryptionInterface {
	status?: bool;
	message?: str;
	EncryptedData?: str;
}

// Update Transaction PIN
export const UpdateTransactionPIN = async (Request: Request, Response: ResponseInterface) => {
	try {
		const { EncryptedData } = Request.body; // Get Request Body Data

		// Decrypt Data & Get Transaction PIN
		const DecryptedData = EncryptedData; // Decrypt Data

		// Check if No Data Send By User
		if (
			DecryptedData.CurrentPin === undefined ||
			DecryptedData.NewPin === undefined ||
			DecryptedData.CurrentPin === "" ||
			DecryptedData.NewPin === "" ||
			DecryptedData.ConfirmNewPin === undefined ||
			DecryptedData.ConfirmNewPin === ""
		) {
			Serve.JSON({
				response: Response,
				status: false,
				message: "Please send all required data",
				data: undefined,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Bad Request",
			});
			return;
		}

		// Short The Email
		const ShortedEmail = DecryptedData.Email.toLowerCase(); // Short The Email

		// Check If Account Exists
		const AccountExists = await AccountExistenceChecker(DecryptedData.PhoneNumber, ShortedEmail); // Check If Account Exists

		if (AccountExists.Information.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				message: "Account Does Not Exist",
				data: undefined,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Does Not Exist",
			});
			return;
		}

		// Check If Transaction PIN Is Correct
		if ((await Compare(DecryptedData.CurrentPin, AccountExists.Information.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				response: Response,
				status: false,
				message: "Transaction PIN Is Incorrect, Please Try Again With The Correct Transaction PIN",
				data: undefined,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "PIN Is Incorrect",
			});
			return;
		}

		// Check if Account is Active
		if (AccountExists.Information.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				response: Response,
				status: false,
				message: "Your Account Is Not Active, Please Contact Support",
				data: undefined,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Account Is Not Active",
			});
			return;
		}

		// Select Random Number as Round
		// Encrypt Password
		const RoundGenerator = new methods.UniqueGenerator(1); // Create Unique ID Generator
		const Rounds: int = RoundGenerator.RandomNumber(false, [1, 2, 3, 4, 5, 6, 7, 8, 9]); // Generate Rounds

		// Encrypt New Transaction PIN
		const EncryptedPIN: PasswordEncryptionInterface = await Bcrypt(DecryptedData.NewPin, Rounds); // Encrypt New Transaction PIN

		// Update Transaction PIN in Database
		const UpdateResult = await MongoDB.ClientAccount.update(
			[{ ClientID: DecryptedData.ClientID }, { Email: ShortedEmail }, { PhoneNumber: DecryptedData.PhoneNumber }],
			{ TransactionPIN: EncryptedPIN.EncryptedData },
			false
		); // Update Transaction PIN in Database

		// Check If Update Was Successful
		if (UpdateResult.status === false || UpdateResult.UpdatedCount === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				message: "Transaction PIN Update Failed, Please Try Again",
				data: undefined,
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				Title: "PIN Update Failed",
			});
			return;
		}

		// Send Response
		Serve.JSON({
			response: Response,
			status: true,
			message: "Transaction PIN Updated Successfully, Please Use The New PIN for Transactions",
			data: undefined,
			statusCode: StatusCodes.OK,
			Title: "PIN Updated Successfully",
		});
	} catch (err: any) {
		Console.red(err);
		Serve.JSON({
			response: Response,
			status: false,
			message: "Internal Server Error",
			data: undefined,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
		});
	}
};
