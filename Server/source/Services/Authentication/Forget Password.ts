/* eslint-disable @typescript-eslint/no-explicit-any */
// Date Created: 9/18/2020, 10:00:00 PM
type int = number; // Define int
type str = string; // Define str

// Imports
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes
import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
import { Encrypt } from "../../Helper/config/Bcrypt.config"; // Import Bcrypt Config
import { Request } from "express"; // Import Request from express
import { randomNumber } from "uniquegen"; // Import Uniquegen
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Function  for forget password Account Details Sender
export const ForgetPasswordAccountFinder = async (
  request: Request,
  response: ResponseInterface
) => {
  try {
    const { Email } = request.params; // Destructure the request body
    // Convert Email to lowercase
    const SmelledEmail = Email.toLowerCase(); // Convert Email to lowercase

    const AccountDetails = await MongoDB.ClientAccount.find(
      "AND",
      [{ Email: SmelledEmail }],
      1
    );
    
    // Check if Account Details is Empty or not
    if(AccountDetails.count === 0){
      JSONSendResponse({
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Account Not Found with this Email or Phone Number",
        Title: "Account Not Found",
        data: undefined,
        response: response,
      }); // Send Response to the Client
      return;
    }

    // Encrypt the Data and send it Using JWT
    const EncryptedData = await JWT.generate(AccountDetails.Data[0], "1h"); // Encrypt the Data and send it Using JWT

    // Send Response to the Client
    JSONSendResponse({
      status: true,
      statusCode: StatusCodes.OK,
      message: "Account Details Matched Successfully",
      Title: "Account Details",
      data: EncryptedData.toKen,
      response: response,
    });
  } catch (error) {
    JSONSendResponse({
      status: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      Title: "Internal Server Error",
      data: undefined,
      response: response,
    });
  }
};

// Interface for Forget Password Updater
interface ForgetPasswordUpdaterInterface {
  PhoneNumber: int;
  Email: str;
  Password: str;
  LastLoginIP: str;
  LastLoginClientDetails: unknown;
}
export const ForgetPasswordUpdater = async (
  request: Request,
  response: ResponseInterface
) => {
  try {
    const {
      PhoneNumber,
      Email,
      Password,
      LastLoginIP,
      LastLoginClientDetails,
    }: ForgetPasswordUpdaterInterface = request.body; // Destructure the request body

    // Convert Email to lowercase
    const SmelledEmail: str = Email.toLowerCase(); // Convert Email to lowercase

    // Encrypt the Password
    const Rounds: int = await randomNumber(
      1,
      false,
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    );
    const EncryptedPassword: any = await Encrypt(Password, Rounds); // Encrypt the Password

    // Find the Account in the Database
    const AccountStatus = await AccountExistenceChecker(
      PhoneNumber,
      SmelledEmail
    ); // Find the Account in the Database

    if (AccountStatus.status === true) {
      const UpdateStatus = await MongoDB.ClientAccount.update(
        [{ Email: SmelledEmail }, { PhoneNumber: PhoneNumber }],
        { Password: EncryptedPassword.EncryptedData },
        false
      );
      // Update Last Login IP and Last Login Client Details

      if (UpdateStatus.status === true) {
        // Encrypt the Data and send it Using JWT
        const EncryptAccountData = await JWT.generate(
          UpdateStatus.UpdatedData,
          "1h"
        ); // Encrypt the Data and send it Using JWT

        // Generate Login Token for the user
        const LoginToken = await JWT.generate(
          {
            ClientID: UpdateStatus.UpdatedData.ClientID,
            LastLoginIP: LastLoginIP,
            LastFourDigitsOfIDNumber:
              UpdateStatus.UpdatedData.LastFourDigitsOfIDNumber,
          },
          "1h"
        ); // Generate Login Token for the user

        // Update Last Login IP and Last Login Client Details
        const ToBeUpdateOptions = {
          LastLoginTime: Date.now(),
          LastLoginIP: LastLoginIP,
          LastLoginClientDetails: LastLoginClientDetails,
          LastLoginToken: LoginToken.toKen,
        }; // Options to be updated
        await MongoDB.ClientAccount.update(
          [
            { PhoneNumber: PhoneNumber },
            { ClientID: UpdateStatus.UpdatedData.ClientID },
          ],
          { $set: ToBeUpdateOptions },
          false
        );

        JSONSendResponse({
          status: true,
          statusCode: StatusCodes.OK,
          message: "Password Updated Successfully",
          Title: "Password Updated",
          data: {
            LoginToken: LoginToken.toKen,
            AccountDetails: EncryptAccountData.toKen,
          },
          response: response,
        }); // Send Response to the Client
      }
    } else if (AccountStatus.status === false) {
      JSONSendResponse({
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Account Not Found with this Email or Phone Number",
        Title: "Account Not Found",
        data: undefined,
        response: response,
      }); // Send Response to the Client
    }
  } catch (error) {
    JSONSendResponse({
      status: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      Title: "Internal Server Error",
      data: undefined,
      response: response,
    });
  }
}; // Function for forget password updater
