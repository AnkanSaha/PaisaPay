// Global Types
type str = string;
type int = number;
type bool = boolean;

// Import Required Modules
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes
import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
import { Request } from "express"; // Import Request from express

// import Helpers
import { Compare } from "../../Helper/config/Bcrypt.config"; // Import Bcrypt Config
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Interfaces for Login
interface LoginRequestInterface extends Request {
  body: {
    PhoneNumber: int;
    Password: str;
    LastLoginIP: str;
    LastLoginClientDetails: unknown;
  };
}

// Interface for is Password Correct
interface isPasswordCorrectInterface {
  isMatch?: bool;
  status?: bool;
  statusCode?: int;
}

// Function for Login
/**
 * The function Login_PaisaPay is used to handle the login process for the PaisaPay application,
 * including password validation and generating a JWT token.
 * @param {LoginRequestInterface} request - The `request` parameter is an object that contains the data
 * sent in the HTTP request. It includes properties such as `PhoneNumber`, `Password`, `LastLoginIP`,
 * and `LastLoginClientDetails`.
 * @param {ResponseInterface} Response - The `Response` parameter is the response object that will be
 * sent back to the client. It is used to send the response data such as status code, message, and
 * data.
 */
export const Login_PaisaPay = async (
  request: LoginRequestInterface,
  Response: ResponseInterface
) => {
  try {
    const { PhoneNumber, Password, LastLoginIP, LastLoginClientDetails } =
      request.body; // Destructure the request body
    
      if (!PhoneNumber || !Password || !LastLoginIP || !LastLoginClientDetails) {
      JSONSendResponse({
        data: undefined,
        Title: "Information Missing in Request",
        message: "Please provide all the required information & try again",
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        response: Response,
      });
      return; // Return if the request body is invalid
    
    } else {
      const AccountStatus = await MongoDB.ClientAccount.find(
        "OR",
        [{ PhoneNumber: PhoneNumber }],
        1
      ); // Find the account in the database
      if (AccountStatus.count > 0) {
        const isPasswordCorrect: isPasswordCorrectInterface = await Compare(
          Password,
          AccountStatus.Data[0].Password
        ); // Compare the password
        if (isPasswordCorrect.isMatch === true) {
          const JWTaccountDetails = await JWT.generate(
            AccountStatus.Data[0],
            "2h"
          ); // Generate JWT Token for Account Details

          const LoginToken = await JWT.generate(
            {
              ClientID: AccountStatus.Data[0].ClientID,
              LastLoginIP: LastLoginIP,
              LastFourDigitsOfIDNumber: AccountStatus.Data[0].LastFourDigitsOfIDNumber,
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
              { ClientID: AccountStatus.Data[0].ClientID },
            ],
            { $set: ToBeUpdateOptions },
            false
          );

          // Send Response
          JSONSendResponse({
            status: true,
            statusCode: StatusCodes.OK,
            Title: "Login Successful",
            message:
              "You have successfully logged in, please wait while we redirect you to your dashboard",
            data: {
              LoginToken: LoginToken.toKen,
              AccountDetails: JWTaccountDetails.toKen,
            },
            response: Response,
          }); // Send Response to the user
        } else if (isPasswordCorrect.isMatch === false) {
          JSONSendResponse({
            status: false,
            statusCode: StatusCodes.UNAUTHORIZED,
            Title: "Unauthorized",
            message:
              "Incorrect Password, please try again with the correct password",
            data: undefined,
            response: Response,
          });
        }
      } else if (AccountStatus.count === 0) {
        JSONSendResponse({
          status: false,
          statusCode: StatusCodes.NOT_FOUND,
          Title: "Not Found",
          message:
            "Account not found, please try again with the correct phone number",
          data: undefined,
          response: Response,
        });
      }
    }
  } catch (err) {
    JSONSendResponse({
      status: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      Title: "Internal Server Error",
      message:
        "An error occurred while processing your request, please try again later",
      data: undefined,
      response: Response,
    });
  }
};
