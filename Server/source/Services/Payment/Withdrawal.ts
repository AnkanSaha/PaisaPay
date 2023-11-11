/* eslint-disable @typescript-eslint/no-explicit-any */
type int = number; // Define int
// type str = string; // Define str

// Imports
import { Request } from 'express'; // Import Request from express
import MongoDB from '../../settings/MongoDB/MongoDB'; // Import MongoDB Instance
import { AccountExistenceChecker } from '../../utils/AC.Exist.Check.utils'; // Import Account Existence Checker
import EncryptConfig from '../../Middleware/Encrypt.middleware'; // Import Encrypt Config
import { Console, Response as Serve, StatusCodes, UniqueGenerator } from 'outers'; // Import red from outers

// Import Interfaces
import { ResponseInterface } from '../../utils/Incoming.Req.Check.utils'; // Import Response Interface

export const WithdrawalMoney = async (Request: Request, Response: ResponseInterface) => {
	try {
		// Decrypt the data
		const DecryptedData = JSON.parse(await EncryptConfig.Decrypt(Request.body.EncryptedData)); // Decrypt the data
		// Check if the account exists
		const AccountExistence = await AccountExistenceChecker(DecryptedData.Phone, DecryptedData.Email); // Check if the account exists

		// Check if the account exists
		if (AccountExistence.status === false) {
			Serve.JSON({
				status: false,
				message: 'Account does not exists.',
				data: null,
				response: Response,
				statusCode: StatusCodes.NOT_FOUND,
				Title: 'Account Not Found',
			});
			return;
		}

		// Check if Account is not Blocked
		if (AccountExistence.Information.Data[0].AccountStatus !== 'Active') {
			Serve.JSON({
				status: false,
				message: `Your account is ${AccountExistence.Information.Data[0].AccountStatus}. Please contact the support team.`,
				data: null,
				response: Response,
				statusCode: StatusCodes.NOT_FOUND,
				Title: `Account is ${AccountExistence.Information.Data[0].AccountStatus}`,
			});
			return;
		}

		// Check If Withdrawal Amount Is Valid
		if (DecryptedData.Amount < 1) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: 'Invalid Amount',
				Title: 'Invalid Amount',
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Check if the account has enough balance
		if (
			AccountExistence.Information.Data[0].Balance < DecryptedData.Amount ||
			AccountExistence.Information.Data[0].Balance === 0 ||
			AccountExistence.Information.Data[0].Balance < 0
		) {
			Serve.JSON({
				status: false,
				message: 'You do not have enough balance.',
				data: null,
				response: Response,
				statusCode: StatusCodes.NOT_FOUND,
				Title: 'Insufficient Balance',
			});
			return;
		}

		// Deduct the amount from the account
		const DeductMoneyFromAccount = await MongoDB.ClientAccount.update(
			[{ ClientID: DecryptedData.ClientID }, { Email: DecryptedData.Email }],
			{
				Balance: AccountExistence.Information.Data[0].Balance - DecryptedData.Amount,
			},
			true
		); // Deduct the amount from the account

		// Check If Deducting Money From Sender Account Was Successful
		if (DeductMoneyFromAccount.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: 'Unable To Deduct Money From Your Account, Maybe Due To Network Error',
				Title: 'Unable To Deduct Money From Your Account',
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Register Transaction ID Generator
		const Generator = new UniqueGenerator(18);

		// Create Transaction ID for this Transaction
		let TransactionID: int; // Create Transaction ID
		let TransactionIDExists: any; // Check If Transaction ID Already Exists

		do {
			// Generate Transaction ID for this Transaction
			TransactionID = Generator.RandomNumber(); // Generate Transaction ID

			// Check if Transaction ID Already Exists
			TransactionIDExists = await MongoDB.Withdrawal.find('AND', [{ TransactionID: TransactionID }]); // Check If Transaction ID Already Exists
		} while (TransactionIDExists.count !== 0);

		// Create A Transaction Record for Server Reference
		const ServerTransactionRecord = await MongoDB.ServerTransaction.create({
			UserClientID: DecryptedData.ClientID,
			UserPaymentID: DecryptedData.PaymentID,
			UserName: DecryptedData.Name,
			UserEmail: DecryptedData.Email,
			UserPhone: DecryptedData.Phone,
			TransactionID: TransactionID,
			TransactionDate: Date.now(),
			TransactionType: 'Withdrawal from Wallet',
			TransactionAmount: DecryptedData.Amount,
			TransactionDescription: `₹ ${DecryptedData.Amount} has been withdrawn from wallet.`,
			TransactionStatus: 'Processing',
			TransactionMethod: 'PaisaPay Wallet',
			TransactionFee: 0,
		});

		// Check if the transaction record was created
		if (ServerTransactionRecord.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: 'Unable To Create Transaction Record, Maybe Due To Network Error',
				Title: 'Unable To Create Transaction Record',
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Create a Withdrawal Request Record
		const WithdrawalRequestRecord = await MongoDB.Withdrawal.create({
			UserClientID: DecryptedData.ClientID,
			UserPaymentID: DecryptedData.PaymentID,
			UserName: DecryptedData.Name,
			UserEmail: DecryptedData.Email,
			UserPhone: DecryptedData.Phone,
			TransactionID: TransactionID,
			TransactionMethod: 'PaisaPay Wallet',
			TransactionDate: Date.now(),
			TransactionAmount: DecryptedData.Amount,
			TransactionStatus: 'Processing',
			TransactionFee: 0,
			BankName: DecryptedData.BankName.toUpperCase(),
			BankAccountHolderName: DecryptedData.AccounntHolderName,
			BankAccountNumber: DecryptedData.BankAccountNumber,
			BankAccountType: DecryptedData.AccountType,
			BankAccountBranch: DecryptedData.BranchName.toUpperCase(),
			IFSCCode: DecryptedData.IFSC.toUpperCase(),
		});

		// Check if the withdrawal request record was created
		if (WithdrawalRequestRecord.status === false) {
			Serve.JSON({
				status: false,
				statusCode: StatusCodes.NOT_ACCEPTABLE,
				message: 'Unable To Create Withdrawal Request Record, Maybe Due To Network Error',
				Title: 'Unable To Create Withdrawal Request Record',
				data: undefined,
				response: Response,
			}); // Send Error Response
			return;
		}

		// Send Response
		Serve.JSON({
			status: true,
			message: 'We have received your withdrawal request. We will process it soon.',
			data: null,
			response: Response,
			statusCode: StatusCodes.OK,
			Title: 'Withdrawal Request Successful',
		});
	} catch (Error) {
		Console.red(Error);
		Serve.JSON({
			status: false,
			message: 'We are facing some issues. Please try again later.',
			data: null,
			response: Response,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: 'Internal Server Error',
		});
	}
};
