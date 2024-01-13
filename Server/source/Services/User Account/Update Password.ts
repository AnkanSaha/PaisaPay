/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
type bool = boolean;
type int = number;

import { Request, Response } from "express"; // Import Request from express

// Import Required Modules
import { Console, StatusCodes,  Serve, methods } from "outers"; // Import Console & Status Codes
import { Compare, Encrypt as Bcrypt } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Middleware

// // import Helpers
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance

// Interfaces
interface DecryptedData {
    CurrentPassword: str,
    NewPassword: str,
    ConfirmNewPassword: str,
    ClientID: int,
    Email: str
    PhoneNumber: int,
    PaymentID: str
}

interface PasswordEncryptionInterface {
    status?: bool;
    statusCode?: int;
    message?: str;
    EncryptedData?: str;

}

export default async function UpdatePassword(Request: Request, Response: Response) {
    try {
        // Decrypt The Info
        const Decrypted_Info: DecryptedData = Request.body.Encrypted_Info; // Decrypt The Info
        
        // Short The Email
        const ShortData = {
            Email: Decrypted_Info.Email.toLowerCase(),
        }

        // Find the User Account if it exists
        const AccountDetails = await AccountExistenceChecker(Decrypted_Info.PhoneNumber, ShortData.Email); // Check If Account Exists
        
        if(AccountDetails.Information.count === 0 ){
            Serve.JSON({
                response: Response,
                status: false,
                statusCode: StatusCodes.NOT_FOUND,
                Title: "Account Not Found",
                message: "The Account You Are Trying To Update Does Not Exist, Please Create An Account",
                data: undefined,
                cookieData: undefined
            }); // Serve JSON
            return;
        }

        // Check if Account is Active
        if(AccountDetails.Information.Data[0].AccountStatus !== "Active"){
           Serve.JSON({
                response: Response,
                status: false,
                statusCode: StatusCodes.FORBIDDEN,
                Title: `Account is ${AccountDetails.Information.Data[0].AccountStatus}`,
                message: "Account is not Active, Please Activate Your Account To Update Your Password",
                data: undefined,
                cookieData: undefined
              }); // Serve JSON
            return;
        }

        // Check if Passwords Match
        if((await Compare(Decrypted_Info.CurrentPassword, AccountDetails.Information.Data[0].Password)).isMatch === false){
            Serve.JSON({
                response: Response,
                status: false,
                statusCode: StatusCodes.BAD_REQUEST,
                Title: "Passwords Do Not Match",
                message: "The Password You Entered Does Not Match Your Current Password, Please Try Again",
                data: undefined,
                cookieData: undefined
            }); // Serve JSON
            return;
        }

        // Register Unique Number Generator
        const Generator = new methods.UniqueGenerator(1); // Create Unique Number Generator

        // Encrypt Password
        const EncryptedPassword : PasswordEncryptionInterface = await Bcrypt(Decrypted_Info.ConfirmNewPassword, Generator.RandomNumber(false)); // Encrypt Password
        
        // Update The New Generated Password In The Database
        const UpdatedStatus = await MongoDB.ClientAccount.update([{ClientID: Decrypted_Info.ClientID}, {Email: ShortData.Email}, {PhoneNumber: Decrypted_Info.PhoneNumber}], {Password: EncryptedPassword.EncryptedData}, false); // Update The New Generated Password In The Database
        
        // Check if Update Was Successful
        if(UpdatedStatus.UpdatedCount === 0){
            Serve.JSON({
                response: Response,
                status: false,
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                Title: "Error Occurred",
                message: "Error Occurred While Updating Password, Please Try Again Later",
                data: undefined,
                cookieData: undefined
            }); // Serve JSON
            return;
        }
        
        Serve.JSON({
            response: Response,
            status: true,
            statusCode: StatusCodes.OK,
            Title: "Password Updated",
            message: "Password Updated Successfully",
            data: undefined,
            cookieData: undefined
        }); // Serve JSON
    }
    catch (Error) {
        Console.red("Error Occurred In UpdatePassword.ts: " + Error); // Log Error
        Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Title: "Error Occurred",
            message: "Error Occurred While Updating Password, Please Try Again Later",
            data: undefined,
            cookieData: undefined
        })
    }
} // Export UpdatePassword