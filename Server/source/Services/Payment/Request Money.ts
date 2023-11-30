type int = number; // Define int
type str = string; // Define str

// Imports
import { Request } from "express"; // Import Request from express
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import EncryptConfig from "../../Middleware/Encrypt.middleware"; // Import Encrypt Config
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
		const Decrypted_Data: DecryptedDataInterface = JSON.parse(await EncryptConfig.Decrypt(Request.body.Encrypted_Request_Info)); // Decrypt Data

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
        const RequestIDGenerator = new UniqueGenerator(16); // Create Unique Generator for RequestID
        const TransactionIDgenerator = new UniqueGenerator(16); // Create Unique Generator

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
        if(CreateRequest.NewCount === 0 ){
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
