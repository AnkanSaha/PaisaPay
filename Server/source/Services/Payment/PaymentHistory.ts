type int = number; // Define int
type str = string; // Define str

// Imports
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes
import { Request } from "express"; // Import Request from express
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker
import EncryptConfig from "../../Helper/config/Encrypt.config"; // Import Encrypt Config
import { Console, Response as Serve } from "outers"; // Import red from outers

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Function
export const GetTransactionHistory = async (
  Request: Request,
  Response: ResponseInterface
) => {
  try {
    const { Number, Email} = Request.body; // Get Data From Request Params
    
    // Decrypt Phone Number & Email ID
    const MobNumber: int = JSON.parse(await EncryptConfig.Decrypt(String(Number))) // Decrypt Phone Number
    const EmailID: str = JSON.parse(await EncryptConfig.Decrypt(String(Email))) // Decrypt Email ID

    const AccountStatus = await AccountExistenceChecker(
      MobNumber,
      EmailID
    ); // Check Account Existence

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
      { UserPaymentID: AccountStatus.Information.Data[0].PaymentID },
      { UserEmail: EmailID },
    ]); // Get All Server Transaction

    // Get All Transaction from MongoDB P2P Transaction Model
    const AllP2PTransaction = await MongoDB.P2PTransaction.find("AND", [
      { ReceivingClientID: AccountStatus.Information.Data[0].ClientID },
      { ReceivingPaymentID: AccountStatus.Information.Data[0].PaymentID },
      { ReceivingEmail: EmailID },
    ]);
 
    // Combine All Transaction Data with Spread Operator
    const NewUnencryptedResponseData = [
      ...AllServerTransaction.Data,
      ...AllP2PTransaction.Data,
    ]; // Spread All Server Transaction Data
    
    // Encrypt All Transaction Data
    const EncryptedData = await EncryptConfig.Encrypt(NewUnencryptedResponseData)

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
