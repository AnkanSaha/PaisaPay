/* eslint-disable @typescript-eslint/no-explicit-any */
type int = number; // Define int
type str = string; // Define str

// Imports
import { Request } from "express"; // Import Request from express
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import { Console, Response as Serve, StatusCodes, UniqueGenerator } from "outers"; // Import red from outers
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Config

// Import Interfaces
import { ResponseInterface } from "../../utils/Incoming.Req.Check.utils"; // Import Response Interface

// Interfaces
interface DecryptedDataInterface {
	SenderPaymentID: str;
	Amount: int;
	TPIN: str;
	RequesterID: int;
	RequesterEmail: str;
	RequesterPhoneNumber: int;
	RequesterPaymentID: str;
}

export default async (Request: Request, Response: ResponseInterface) => {
	try {
		// Decrypt Data from Request
		const Decrypted_Data: DecryptedDataInterface = Request.body.Encrypted_Request_Info; // Decrypt Data

		// Short Data
		const ShortData = {
			RequesterEmail: Decrypted_Data.RequesterEmail.toLowerCase(),
			SenderPaymentID: Decrypted_Data.SenderPaymentID.toLowerCase(),
			RequesterPaymentID: Decrypted_Data.RequesterPaymentID.toLowerCase(),
		};

		// Regex for checking if  @pp or @PP is in the payment id
		const PaymentIDRegex = new RegExp("@pp", "gi"); // Create Regex

		// Check if Payment ID is valid
		if (PaymentIDRegex.test(Decrypted_Data.SenderPaymentID) === false) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Invalid Payment ID",
				message: "The Payment ID you entered is invalid. Please try again.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Requester Account Exists
		const RequesterAccountExists = await AccountExistenceChecker(Decrypted_Data.RequesterPhoneNumber, ShortData.RequesterEmail); // Check if Requester Account Exists
		if (RequesterAccountExists.Information.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "Your account does not exist. Please create an account to request money.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Sender Account Exists
		const SenderAccountExists = await MongoDB.ClientAccount.find("AND", [{ PaymentID: ShortData.SenderPaymentID }]); // Check if Sender Account Exists
		if (SenderAccountExists.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "The account you are trying to request money from does not exist.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Requester Account is Active
		if (RequesterAccountExists.Information.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.FORBIDDEN,
				Title: `Account ${RequesterAccountExists.Information.Data[0].AccountStatus}`,
				message: `Your account is ${RequesterAccountExists.Information.Data[0].AccountStatus}. Please activate your account.`,
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Sender Account is Active
		if (SenderAccountExists.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.FORBIDDEN,
				Title: `Account ${SenderAccountExists.Data[0].AccountStatus}`,
				message: `The account you are trying to request money from is ${SenderAccountExists.Data[0].AccountStatus}. Please activate your account.`,
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Sender Account has enough balance
		if (SenderAccountExists.Data[0].Balance < Decrypted_Data.Amount || SenderAccountExists.Data[0].Balance === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.FORBIDDEN,
				Title: "Insufficient Balance",
				message: "The account you are trying to request money from does not have enough balance.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if Amount is Valid
		if (Decrypted_Data.Amount <= 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Invalid Amount",
				message: "The amount you entered is invalid. Please try again.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Check if TPIN is Valid
		if ((await Compare(Decrypted_Data.TPIN, RequesterAccountExists.Information.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.BAD_REQUEST,
				Title: "Invalid TPIN",
				message: "The TPIN you entered is invalid. Please try again.",
				data: undefined,
			}); // Send Response
			return; // Return
		}
		// Create Transaction Record for Sender & Requester
		const RequestIDGenerator = new methods.UniqueGenerator(11); // Create Unique Generator for RequestID
		const TransactionIDgenerator = new methods.UniqueGenerator(16); // Create Unique Generator

		// Create Request
		const CreateRequest = await MongoDB.RequestMoney.create({
			RequestID: RequestIDGenerator.RandomNumber(true),
			RequesterClientID: RequesterAccountExists.Information.Data[0].ClientID,
			RequesterName: RequesterAccountExists.Information.Data[0].Name,
			RequesterPaymentID: RequesterAccountExists.Information.Data[0].PaymentID,
			RequesterEmail: RequesterAccountExists.Information.Data[0].Email,
			RequesterPhoneNumber: RequesterAccountExists.Information.Data[0].PhoneNumber,
			RequesterIPaddress: Request.body.RequesterIPaddress,
			TransactionID: TransactionIDgenerator.RandomNumber(true),
			TransactionAmount: Decrypted_Data.Amount,
			TransactionStatus: "Pending",
			TransactionFee: 0,
			SenderClientID: SenderAccountExists.Data[0].ClientID,
			SenderName: SenderAccountExists.Data[0].Name,
			SenderEmail: SenderAccountExists.Data[0].Email,
			SenderPhoneNumber: SenderAccountExists.Data[0].PhoneNumber,
			SenderPaymentID: SenderAccountExists.Data[0].PaymentID,
		}); // Create Request

		// Check if Request was created successfully or not
		if (CreateRequest.NewCount === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				Title: "Internal Server Error",
				message: "Something went wrong while processing your request. Please try again later.",
				data: undefined,
			}); // Send Response
			return; // Return
		}
		// Send Response to Client if everything is okay
		Serve.JSON({
			response: Response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: "Request Sent Successfully",
			message: "Your Request has been sent successfully. You will be notified when the transaction is completed.",
			data: undefined,
		}); // Send Response to client if everything is okay
	} catch (Error) {
		Console.red(Error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong while processing your request. Please try again later.",
			data: undefined,
		}); // Send Response
	}
};

export async function Get_Request_money(Request: Request, Response: ResponseInterface) {
	try {
		const { ClientID, Email } = Request.query; // Get ClientID & Email from Request
		// Short the Email ID
		const ShortEmail = String(Email).toLowerCase(); // Short Email ID

		// Check if ClientID is valid
		const AccountDetails = await MongoDB.ClientAccount.find("AND", [{ ClientID }, { Email: ShortEmail }]); // Check if ClientID is valid

		// Check if Account Exists or not
		if (AccountDetails.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "Account Not Found",
				message: "The account you are trying to request money from does not exist.",
				data: undefined,
			}); // Send Response
			return; // Return
		}

		// Find all requests made by the another user to this user
		const AllRequests = await MongoDB.RequestMoney.find("AND", [{ SenderClientID: ClientID }, { SenderEmail: ShortEmail }]); // Find all requests made by the another user to this user

		// Check if there are any requests
		if (AllRequests.count === 0) {
			Serve.JSON({
				response: Response,
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				Title: "No Requests Found",
				message: "You do not have any requests. See you later.",
				data: undefined,
			}); // Send Response
			return; // Return
		}
		// Encrypt Data & Send Response
		const EncryptedData = AllRequests.Data; // Encrypt Data

		// Send Response
		Serve.JSON({
			response: Response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: "Requests Found",
			message: "Requests Found. Please check the data.",
			data: EncryptedData,
		}); // Send Response
	} catch (Error) {
		Console.red(Error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong while processing your request. Please try again later.",
			data: undefined,
		}); // Send Response
	}
}

export async function Accept_Request_Money(Request: Request, Response: ResponseInterface) {
	try {
		const { Encrypted_Request_Info } = Request.body; // Get Body

		// Decrypt Payment Info
		const PaymentInfo = Encrypted_Request_Info;

		// Check If Sender Account Exists
		const SenderAccountExists = await AccountExistenceChecker(PaymentInfo.SenderPhone, PaymentInfo.SenderEmail);

		// Check If Sender Account Exists
		if (SenderAccountExists.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				message: "Sender Account Does Not Exists, Please Create An Account",
				Title: SenderAccountExists.message,
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check If Sender Account Is Active
		if (SenderAccountExists.Information.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: `Your Account Is ${SenderAccountExists.Information.Data[0].AccountStatus}, Please Contact Support`,
				Title: "Account Not Active",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check if Transaction PIN is Correct

		if ((await Compare(PaymentInfo.TransactionPIN, SenderAccountExists.Information.Data[0].TransactionPIN)).isMatch === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: `Transaction PIN is Incorrect | Please Enter Correct Transaction PIN`,
				Title: "Incorrect Transaction PIN",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return; // Return
		}

		// Check If Receiver Account Exists
		const ReceiverAccountDetails = await MongoDB.ClientAccount.find("AND", [{ PaymentID: PaymentInfo.ReceivingPaymentID }]);

		// Check If Receiver Account Exists
		if (ReceiverAccountDetails.count === 0) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_FOUND,
				message: "No User Found With The Provided Payment ID",
				Title: "Not Found",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check If Receiver Account Is Active
		if (ReceiverAccountDetails.Data[0].AccountStatus !== "Active") {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: `Receiver Account Is ${ReceiverAccountDetails.Data[0].AccountStatus}, Please Contact Support`,
				Title: "Account Not Active",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check If Sending Amount Is Valid
		if (PaymentInfo.TransactionAmount < 1) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: "Invalid Amount",
				Title: "Invalid Amount",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check If Sender Has Enough Balance
		if (
			SenderAccountExists.Information.Data[0].Balance < PaymentInfo.TransactionAmount ||
			SenderAccountExists.Information.Data[0].Balance === 0 ||
			SenderAccountExists.Information.Data[0].Balance < 0
		) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: "You Don't Have Enough Balance To Send Money",
				Title: "Not Enough Balance",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}
		// Deduct Money From Sender Account
		const DeductMoneyFromSenderAccount = await MongoDB.ClientAccount.update(
			[{ ClientID: PaymentInfo.SendingClientID }, { Email: PaymentInfo.SenderEmail }],
			{ Balance: SenderAccountExists.Information.Data[0].Balance - PaymentInfo.TransactionAmount },
			true
		);
		// Check If Deducting Money From Sender Account Was Successful
		if (DeductMoneyFromSenderAccount.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: "Unable To Deduct Money From Sender Account, Maybe Due To Network Error",
				Title: "Unable To Deduct Money From Sender Account",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Add Money To Receiver Account
		const AddMoneyToReceiverAccount = await MongoDB.ClientAccount.update(
			[{ PaymentID: PaymentInfo.ReceivingPaymentID }],
			{ Balance: parseInt(ReceiverAccountDetails.Data[0].Balance) + parseInt(PaymentInfo.TransactionAmount) },
			true
		);
		// Check If Adding Money To Receiver Account Was Successful
		if (AddMoneyToReceiverAccount.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: "Unable To Add Money To Receiver Account, Maybe Due To Network Error",
				Title: "Unable To Add Money To Receiver Account",
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

				// Register Transaction ID Generator
				const Generator = new methods.UniqueGenerator(18);

				// Create Transaction ID for this Transaction
				let TransactionID: int; // Create Transaction ID
				let TransactionIDExists: any; // Check If Transaction ID Already Exists
		
				do {
					// Generate Transaction ID for this Transaction
					TransactionID = Generator.RandomNumber(); // Generate Transaction ID
		
					// Check if Transaction ID Already Exists
					TransactionIDExists = await MongoDB.P2PTransaction.find("AND", [{ TransactionID: TransactionID }]); // Check If Transaction ID Already Exists
				} while (TransactionIDExists.count !== 0);
		
				// Create Transaction History for Sender
				const CreateTransactionHistoryForSenderStatus = await MongoDB.P2PTransaction.create({
					ReceivingClientID: ReceiverAccountDetails.Data[0].ClientID,
					ReceivingPaymentID: ReceiverAccountDetails.Data[0].PaymentID,
					ReceivingName: ReceiverAccountDetails.Data[0].Name,
					ReceivingEmail: ReceiverAccountDetails.Data[0].Email,
					ReceivingPhone: ReceiverAccountDetails.Data[0].PhoneNumber,
					SendingClientID: SenderAccountExists.Information.Data[0].ClientID,
					SendingPaymentID: SenderAccountExists.Information.Data[0].PaymentID,
					SenderName: SenderAccountExists.Information.Data[0].Name,
					TransactionMethod: "PaisaPay Wallet",
					SenderEmail: SenderAccountExists.Information.Data[0].Email,
					SenderPhone: SenderAccountExists.Information.Data[0].PhoneNumber,
					TransactionID: TransactionID,
					TransactionDate: Date.now(),
					TransactionAmount: PaymentInfo.TransactionAmount,
					TransactionDescription: PaymentInfo.TransactionDescription === "" ? "No Description Provided" : PaymentInfo.TransactionDescription,
					TransactionStatus: "Transaction Success",
				});
		
				// Check If Creating Transaction History For Sender Was Successful
				if (CreateTransactionHistoryForSenderStatus.status === false) {
					Serve.JSON({
						status: false,
						statusCode: StatusCodes.NOT_ACCEPTABLE,
						message: "Unable To Create Transaction History For Sender, Maybe Due To Network Error",
						Title: "Unable To Create Transaction History For Sender",
						data: undefined,
						response: Response,
					}); // Send Error Response
					return;
				}

				// Update Request Status to Completed
				const UpdateRequestStatus = await MongoDB.RequestMoney.update([{RequesterClientID: ReceiverAccountDetails.Data[0].ClientID}, {RequestID: PaymentInfo.RequestID}], {TransactionStatus: "Completed"}, true); // Update Request Status to Completed
				
				// Check If Updating Request Status Was Successful
				if(UpdateRequestStatus.UpdatedCount === 0) {
					Serve.JSON({
						status: false,
						statusCode: StatusCodes.NOT_ACCEPTABLE,
						message: "Unable To Update Request Status, Maybe Due To Network Error, Please Contact Support",
						Title: "Unable To Update Request Status",
						data: undefined,
						response: Response,
					}); // Send Error Response
					return;
				}

				// Send Response to Sender
				Serve.JSON({
					status: true,
					statusCode: StatusCodes.OK,
					message: "Transaction Success, Money Sent Successfully to Receiver",
					Title: "Transaction Success",
					data: undefined,
					response: Response,
				}); // Send Response to Sender
	} catch (Error) {
		Console.red(Error); // Log Error
		Serve.JSON({
			response: Response,
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong while processing your request. Please try again later.",
			data: undefined,
		}); // Send Response
	}
}
