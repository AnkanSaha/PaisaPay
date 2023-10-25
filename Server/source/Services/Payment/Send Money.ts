// type int = number; // Define int
// type str = string; // Define str

// Imports
import { Request } from "express"; // Import Request from express
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker
import EncryptConfig from "../../Helper/config/Encrypt.config"; // Import Encrypt Config
import { Console, Response as Serve, StatusCodes, UniqueGenerator } from "outers"; // Import red from outers

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

export const SendMoney = async (Request: Request, Response: ResponseInterface) => {
    try{
        const {Encrypted_PaymentInfo} = Request.body; // Get Body

        // Decrypt Payment Info
        const PaymentInfo = JSON.parse(await EncryptConfig.Decrypt(Encrypted_PaymentInfo));

        // Check If Sender Account Exists
        const SenderAccountExists = await AccountExistenceChecker(PaymentInfo.SenderPhone, PaymentInfo.SenderEmail);

        // Check If Sender Account Exists
        if(SenderAccountExists.status === false){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: "Sender Account Does Not Exists, Please Create An Account",
                Title: SenderAccountExists.message,
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Check If Receiver Account Exists
        const ReceiverAccountDetails = await MongoDB.ClientAccount.find("AND", [{PaymentID: PaymentInfo.ReceivingPaymentID}])

        // Check If Receiver Account Exists
        if(ReceiverAccountDetails.count === 0){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: "No User Found With The Provided Payment ID",
                Title: "Not Found",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Check If Sending Amount Is Valid
        if(PaymentInfo.TransactionAmount < 1){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "Invalid Amount",
                Title: "Invalid Amount",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Check If Sender Has Enough Balance
        if(SenderAccountExists.Information.Data[0].Balance < PaymentInfo.TransactionAmount || SenderAccountExists.Information.Data[0].Balance === 0 || SenderAccountExists.Information.Data[0].Balance < 0){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "You Don't Have Enough Balance To Send Money",
                Title: "Not Enough Balance",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Deduct Money From Sender Account
        const DeductMoneyFromSenderAccount = await MongoDB.ClientAccount.update([{ClientID: PaymentInfo.SendingClientID}, {Email: PaymentInfo.SenderEmail}], {Balance: SenderAccountExists.Information.Data[0].Balance - PaymentInfo.TransactionAmount}, true);
        // Check If Deducting Money From Sender Account Was Successful
        if(DeductMoneyFromSenderAccount.status === false){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "Unable To Deduct Money From Sender Account, Maybe Due To Network Error",
                Title: "Unable To Deduct Money From Sender Account",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Add Money To Receiver Account
        const AddMoneyToReceiverAccount = await MongoDB.ClientAccount.update([{PaymentID: PaymentInfo.ReceivingPaymentID}], {Balance: parseInt(ReceiverAccountDetails.Data[0].Balance) + parseInt(PaymentInfo.TransactionAmount)}, true);
        // Check If Adding Money To Receiver Account Was Successful
        if(AddMoneyToReceiverAccount.status === false){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "Unable To Add Money To Receiver Account, Maybe Due To Network Error",
                Title: "Unable To Add Money To Receiver Account",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // Register Transaction ID Generator
        const Generator = new UniqueGenerator(18)

        // Create Transaction ID for this Transaction
        const TransactionID = Generator.RandomNumber(); // Generate Transaction ID

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
            TransactionType: `${ReceiverAccountDetails.Data[0].Name}`,
            TransactionAmount: PaymentInfo.TransactionAmount,
            TransactionDescription: PaymentInfo.TransactionDescription === "" ? "No Description Provided" : PaymentInfo.TransactionDescription,
            TransactionStatus: "Transaction Success",
        })

        // Check If Creating Transaction History For Sender Was Successful
        if(CreateTransactionHistoryForSenderStatus.status === false){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_ACCEPTABLE,
                message: "Unable To Create Transaction History For Sender, Maybe Due To Network Error",
                Title: "Unable To Create Transaction History For Sender",
                data: undefined,
                response: Response,
            }) // Send Error Response
            return;
        }

        // send Response to Sender
        Serve.JSON({
            status: true,
            statusCode: StatusCodes.OK,
            message: `Transaction Success | Money Sent Successfully to ${ReceiverAccountDetails.Data[0].Name}`,
            Title: "Transaction Success",
            data: await EncryptConfig.Encrypt({
                TransactionID: TransactionID,
                TransactionDate: Date.now(),
                TransactionType: `${ReceiverAccountDetails.Data[0].Name}`,
                TransactionAmount: PaymentInfo.TransactionAmount,
                TransactionDescription: PaymentInfo.TransactionDescription === "" ? "No Description Provided" : PaymentInfo.TransactionDescription,
                TransactionStatus: "Transaction Success",
                NewBalance: SenderAccountExists.Information.Data[0].Balance - PaymentInfo.TransactionAmount,
            }),
            response: Response,
        }); // Send Response
    }
    catch (error){
        Console.red(error)
        Serve.JSON({
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            Title: "Internal Server Error",
            data: undefined,
            response: Response,
        }) // Send Error Response
    }
};