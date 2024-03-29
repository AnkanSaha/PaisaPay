type int = number; // Define int
type str = string; // Define str

// Imports
import { Request, Response } from "express"; // Import Request from express
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import { Console, Serve, StatusCodes } from "outers"; // Import red from outers

// Function
export const GetTransactionHistory = async (Request: Request, Response: Response) => {
	try {
		const { Number, Email } = Request.body; // Get Data From Request Params

		// Decrypt Phone Number & Email ID
		const MobNumber: int = Number; // Decrypt Phone Number
		const EmailID: str = Email; // Decrypt Email ID

		const AccountStatus = await AccountExistenceChecker(MobNumber, EmailID); // Check Account Existence

		// Check Account Status
		if (AccountStatus.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				message: AccountStatus.message,
				Title: "Bad Request",
				data: undefined,
				response: Response,
			});
			return;
		}

		// Get All Transaction from MongoDB Server Transaction Model
		const AllServerTransaction = await MongoDB.ServerTransaction.find("AND", [
			{ UserClientID: AccountStatus.Information.Data[0].ClientID },
			{ UserPhone: AccountStatus.Information.Data[0].PhoneNumber },
			{ UserEmail: EmailID },
		]); // Get All Server Transaction

		// Get All Receiving Transaction from MongoDB P2P Transaction Model
		const AllReceivingTransaction = await MongoDB.P2PTransaction.find("AND", [
			{ ReceivingClientID: AccountStatus.Information.Data[0].ClientID },
			{ ReceivingPhone: AccountStatus.Information.Data[0].PhoneNumber },
			{ ReceivingEmail: EmailID },
		]);

		// Get All Sending Transaction from MongoDB P2P Transaction Model
		const AllSendingTransaction = await MongoDB.P2PTransaction.find("AND", [
			{ SendingClientID: AccountStatus.Information.Data[0].ClientID },
			{ SenderPhone: AccountStatus.Information.Data[0].PhoneNumber },
			{ SenderEmail: EmailID },
		]);

		// Combine All Transaction Data with Spread Operator
		const NewUnencryptedResponseData = [...AllServerTransaction.Data, ...AllReceivingTransaction.Data, ...AllSendingTransaction.Data]; // Spread All Server Transaction Data

		// Short All Transaction Data by Latest to Oldest
		const SortedUnencryptedResponseData = NewUnencryptedResponseData.sort((item1, item2) => {
			return new Date(item2.TransactionDate).getTime() - new Date(item1.TransactionDate).getTime();
		}); // Sort All Transaction Data

		// Encrypt All Transaction Data
		const EncryptedData = SortedUnencryptedResponseData; // Encrypt All Transaction Data

		Serve.JSON({
			status: true,
			statusCode: StatusCodes.OK,
			message: "Transaction History Received",
			Title: "Transaction History Received Successfully",
			data: EncryptedData,
			response: Response,
		});
	} catch (error) {
		Console.red(error); // Log Error
		Serve.JSON({
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
			Title: "Internal Server Error",
			data: undefined,
			response: Response,
		});
	}
};
