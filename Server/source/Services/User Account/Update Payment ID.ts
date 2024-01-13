/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
// type bool = boolean;
type int = number;

// Import Required Modules
import { Request, Response } from "express"; // Import Request from express
// Import Required Modules
import { Console, StatusCodes, Serve } from "outers"; // Import Console & Status Codes
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Database
import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Middleware

// Interfaces
interface Decrypted_Data_Interface {
    NewPaymentID: str,
    TPIN: str,
    ClientID: int,
    PhoneNumber: int,
    Email: str,
    PreviousPaymentID: str
}

// Function
export default async function UpdatePaymentID (Request: Request, Response: Response){
    try{
        const Decrypted_Data: Decrypted_Data_Interface = Request.body.Encrypted_Info; // Decrypt Data
        const SmelledDetails = {
            Email:Decrypted_Data.Email.toLowerCase(),
            NewPaymentID: `${Decrypted_Data.NewPaymentID.toLowerCase()}@pp`,
            OldPaymentID: Decrypted_Data.PreviousPaymentID.toLowerCase()
        }; // Smell Details with Lowercase

        // Find Account With PhoneNumber & Email
        const AccountDetails = await MongoDB.ClientAccount.findAndCount('AND', [{ClientID:Decrypted_Data.ClientID}, {PhoneNumber:Decrypted_Data.PhoneNumber}, {Email: SmelledDetails.Email}]); // Find Account

        // Check If Account Exists
        if(AccountDetails.count === 0) return Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.NOT_FOUND,
            Title: "Account Not Found",
            message: "Your Account Was Not Found, Please Try Again Later",
            data: undefined,
            cookieData: undefined
        }); // Serve JSON

        // Check if Account is Active
        if (AccountDetails.Data[0].AccountStatus !== "Active") return Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.NOT_ACCEPTABLE,
            Title: `Account ${AccountDetails.Data[0].AccountStatus}`,
            message: `Your Account Is ${AccountDetails.Data[0].AccountStatus} Please Activate Your Account To Update Your Payment ID`,
            data: undefined,
            cookieData: undefined
        }); // Serve JSON

        // Check If TPIN is Correct
        
        if((await Compare(Decrypted_Data.TPIN, AccountDetails.Data[0].TransactionPIN)).isMatch === false) return Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.NOT_ACCEPTABLE,
            Title: "Incorrect TPIN",
            message: "The TPIN You Entered Is Incorrect, Please Try Again Later With The Correct TPIN",
            data: undefined,
            cookieData: undefined
        }); // Serve JSON

        // Check if New payment is Already in Use in this Account
        if(SmelledDetails.Email === AccountDetails.Data[0].PaymentID) return Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.NOT_ACCEPTABLE,
            Title: "Payment ID Already In Use",
            message: "The Payment ID You Entered Is Already In Use By This Account, Please Try Again Later With Another Payment ID",
            data: undefined,
            cookieData: undefined
        }); // Serve JSON

        // Check if New payment is Already in Use in another Account
        const PaymentIDDetails = await MongoDB.ClientAccount.findAndCount('AND', [{PaymentID:SmelledDetails.NewPaymentID}]); // Find Account
        if (PaymentIDDetails.count !== 0) return Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.NOT_ACCEPTABLE,
            Title: "Payment ID Already In Use",
            message: "The Payment ID You Entered Is Already In Use By Another Account, Please Try Again Later With Another Payment ID",
            data: undefined,
            cookieData: undefined
        }); // Serve JSON

        // iF ALL IS GOOD, UPDATE PAYMENT ID
        const UpdateStatus = await MongoDB.ClientAccount.update([{ClientID:Decrypted_Data.ClientID}, {PhoneNumber:Decrypted_Data.PhoneNumber}, {Email: SmelledDetails.Email}], {PaymentID: SmelledDetails.NewPaymentID}, false); // Update Payment ID

        Serve.JSON({
            response: Response,
            status: true,
            statusCode: StatusCodes.OK,
            Title: "Payment ID Updated",
            message: "Your Payment ID Has Been Updated Successfully, You Can Now Use It To Receive Payments",
            data: {
                sessionID: UpdateStatus.UpdatedData.LastLoginToken,
                AccountDetails: UpdateStatus.UpdatedData
            },
            cookieData: undefined
        }); // Serve JSON
    }
    catch (error){
        Console.red(error); // Log Error
        Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Title: "Internal Server Error",
            message: "An Error Occurred While Updating Your Payment ID, Please Try Again Later",
            data: undefined,
            cookieData: undefined
        })
    }
}