/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
type str = string;
type int = number;
type bool = boolean;

import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes, StringKeys } from "../../settings/keys/keys"; // Import HTTP Status Codes
import fs from "fs"; // Import fs
import { Request } from "express"; // Import Request from express
import { randomNumber } from "uniquegen"; // Import Uniquegen
import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
import Crypto from '../../Helper/config/Encrypt.config'; // Import Crypto Config

// import Helpers
import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker
import { Encrypt } from '../../Helper/config/Bcrypt.config'; // Import Bcrypt Config
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface
import { red } from "outers";

// Interfaces for Signup
interface SignupRequestInterface extends Request {
    body: {
        Name: str,
        Email: str,
        DOB: Date,
        PhoneNumber: int,
        PaymentID: str,
        Password: str,
        National_ID_Type: str,
        National_ID_Number: str,
        LastLoginIP: str,
        LastLoginClientDetails: str,
    },
    file?: Express.Multer.File | any
}

// Inter\face for Password Encryption
interface PasswordEncryptionInterface {
    status?: bool,
    message?: str,
    EncryptedData?: str,
}

/**
 * The Register function is an asynchronous function that handles the registration process for a new
 * client account, including checking for existing accounts, encrypting passwords and national ID
 * numbers, generating a client ID, and creating the client account in a MongoDB database.
 * @param {SignupRequestInterface} req - The `req` parameter is an object that represents the HTTP
 * request made to the server. It contains information such as the request body, headers, and query
 * parameters.
 * @param {ResponseInterface} res - The `res` parameter is the response object that will be sent back
 * to the client. It contains information such as the status code, headers, and the response body.
 */
export async function Register(req: SignupRequestInterface, res: ResponseInterface) {
    try {
        const { Name, Email, DOB, Password, National_ID_Type, National_ID_Number, PhoneNumber, LastLoginIP, LastLoginClientDetails, PaymentID } = req.body; // Destructure the request body
        if(!Name || !Email || !DOB || !Password || !National_ID_Type || !National_ID_Number || !PhoneNumber || !LastLoginIP || !LastLoginClientDetails || !PaymentID) {
            await fs.promises.rm(req.file.path)
            JSONSendResponse({
                status: false,
                statusCode: StatusCodes.BAD_REQUEST,
                Title: 'Information Missing in Request',
                message: 'Please provide all the required information & try again',
                response: res,
                data: undefined
            })
            return; // Return if the request body is invalid
        }
        else {
            // Decrypt All the Strings
            const DecryptedName = JSON.parse(await Crypto.Decrypt(Name)) // Decrypt Name
            const DecryptedDOB = JSON.parse(await Crypto.Decrypt(String(DOB))) // Decrypt DOB
            const DecryptedPassword = JSON.parse(await Crypto.Decrypt(Password)) // Decrypt Password
            const DecryptedNational_ID_Type = JSON.parse(await Crypto.Decrypt(National_ID_Type)) // Decrypt National ID Type
            const DecryptedNational_ID_Number = JSON.parse(await Crypto.Decrypt(National_ID_Number)) // Decrypt National ID Number
            const DecryptedPhoneNumber = JSON.parse(await Crypto.Decrypt(String(PhoneNumber))) // Decrypt Phone Number
            const DecryptedLastLoginIP = JSON.parse(await Crypto.Decrypt(LastLoginIP)) // Decrypt Last Login IP
            const DecryptedLastLoginClientDetails = JSON.parse(await Crypto.Decrypt(LastLoginClientDetails)) // Decrypt Last Login Client Details
            const DecryptedPaymentID = JSON.parse(await Crypto.Decrypt(PaymentID)) // Decrypt Payment ID
            const DecryptedEmail = JSON.parse(await Crypto.Decrypt(Email)) // Decrypt Email

            // Lowercase all the strings
            const SmallEmail = DecryptedEmail.toLowerCase(); // Convert Email to lowercase
            const SmallPaymentID = DecryptedPaymentID.toLowerCase(); // Convert Payment ID to lowercase

        const AccountStatus = await AccountExistenceChecker(DecryptedPhoneNumber, SmallEmail); // Check if account exists
        if (AccountStatus.status == true) {
            await fs.promises.rm(req.file.path)
            JSONSendResponse({
                status: false,
                statusCode: StatusCodes.CONFLICT,
                Title: 'Account Exists',
                message: 'Account exists with the same email or phone number or ID number',
                response: res,
                data: undefined
            })
            return; // Return if the account exists
        }
        else if (AccountStatus.status == false) {
            // Encrypt Password
            const Rounds: int = await randomNumber(1, false, [1, 2, 3, 4, 5, 6, 7, 8, 9])

            const EncryptedResult: PasswordEncryptionInterface = await Encrypt(DecryptedPassword, Rounds);

            // Encrypt National ID Number
            const EncryptedNationalIDNumber: PasswordEncryptionInterface = await Encrypt(DecryptedNational_ID_Number, Rounds);

            const LastFourDigitsOfIDNumber: str = DecryptedNational_ID_Number.slice(-4); // Get Last Six Digits of ID Number

            // Generate Client ID
            const ClientID: int = await randomNumber(20, true); // Generate Client ID

            // Generate Last Login Token
            const LastLoginToken = await JWT.generateLoginToken({ ClientID: ClientID, Email: SmallEmail, PhoneNumber: DecryptedPhoneNumber }, 2, StringKeys.JWT_EXPIRES_IN)

            // Check if account exists with the same last six digits of ID number
            const AccountDetails = await MongoDB.ClientAccount.find('OR', [{ LastFourDigitsOfIDNumber: LastFourDigitsOfIDNumber }]); // Find the account in the database
            if (AccountDetails.Data.length > 0) {
                await fs.promises.rm(req.file.path)

                JSONSendResponse({
                    status: false,
                    statusCode: StatusCodes.CONFLICT,
                    Title: 'Account Exists',
                    message: 'Account exists with the same last six digits of ID number',
                    response: res,
                    data: undefined
                })
                return; // Return if the account exists with the same last six digits of ID number
            }

            // Check if account exists with the same  Payment ID
            const SamePaymentIDAccountDetails = await MongoDB.ClientAccount.find('OR', [{ PaymentID: SmallPaymentID }]); // Find the account in the database

            if(SamePaymentIDAccountDetails.Data.length > 0) {
                JSONSendResponse({
                    status: false,
                    statusCode: StatusCodes.CONFLICT,
                    Title: 'Account Exists',
                    message: 'Account exists with the same Payment ID',
                    response: res,
                    data: undefined
                }) // Send Response
                return; // Return if the account exists with the same Payment ID
            }

            // Create Client Account
            const NewClientAccount = {
                ClientID: ClientID,
                Name: DecryptedName,
                Email: SmallEmail,
                DOB: DecryptedDOB,
                PhoneNumber: DecryptedPhoneNumber,
                Balance: 0,
                PaymentID: SmallPaymentID,
                Password: EncryptedResult.EncryptedData,
                National_ID_Type: DecryptedNational_ID_Type,
                National_ID_Number: EncryptedNationalIDNumber.EncryptedData,
                LastFourDigitsOfIDNumber: LastFourDigitsOfIDNumber,
                ProfilePicturePath: req.file.path,
                ProfilePicSize: `${req.file.size / 1000 / 1000} MB`,
                ProfilePicFileName: req.file.filename,
                DateCreated: Date.now(),
                AccountStatus: "Active",
                AccountType: "Client",
                LastLoginTime: Date.now(),
                LastLoginIP: DecryptedLastLoginIP,
                LastLoginClientDetails: DecryptedLastLoginClientDetails,
                LastLoginToken: LastLoginToken.toKen
            } // Create New Client Account

            // Create All Account Related Records in MongoDB
            const AccountStatus = await MongoDB.ClientAccount.create(NewClientAccount); // Create Client Account in MongoDB

            // Generate JWT Token
            const EncryptedAccountData = await Crypto.Encrypt(AccountStatus.NewData[0]); // Encrypt Account Data

            // Send Response to Client
            if (AccountStatus.status === true) {
                JSONSendResponse({
                    status: true,
                    statusCode: StatusCodes.OK,
                    Title: 'Account Created',
                    message: 'Account created successfully, you can now login',
                    response: res,
                    data: {
                        sessionID: LastLoginToken.toKen,
                        AccountDetails: EncryptedAccountData
                    }
                })
            }
            else if (AccountStatus.status === false) {
                JSONSendResponse({
                    status: false,
                    statusCode: StatusCodes.BAD_REQUEST,
                    Title: 'Database Error',
                    message: 'Look like there is a problem with the database, please try again later',
                    response: res,
                    data: AccountStatus
                })
            }

        }
    }
}
    catch (err) {
        red(err); // Log Error to Console
        JSONSendResponse({
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Title: 'Internal Server Error',
            message: 'Internal Server Error',
            response: res,
            data: []
        })
    }
}