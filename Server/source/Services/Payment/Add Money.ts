/* eslint-disable @typescript-eslint/no-explicit-any */
type int = number; // Define int
type str = string; // Define str

// Imports
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes, Payment_Keys } from "../../settings/keys/keys"; // Import HTTP Status Codes
import { Request } from "express"; // Import Request from express
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

export const AddMoney = async (
  Request: Request,
  Response: ResponseInterface
) => {
  try {
    const { account_id, event, payload } = Request.body; // Get Data From Request Body
    // Check if account id is valid & payment done by merchant
    if (account_id.replace("acc_", "") !== Payment_Keys.MERCHANT_ID) {
      JSONSendResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        status: false,
        message: "Invalid Account ID",
        Title: "Invalid Account ID",
        data: undefined,
        response: Response,
      });
      return; // Return from here if account id is invalid
    }

    // Check if service is PaisaPay
    if (payload.payment.entity.notes.choose_service !== "PaisaPay Services") {
      JSONSendResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        status: false,
        message: "Invalid Service",
        Title: "Invalid Service",
        data: undefined,
        response: Response,
      });
      return; // Return from here if service is invalid
    }

    // User Account Details From Payload
    const NumberWithoutCountryCode = removeCountryCode(payload.payment.entity.notes.phone); // Remove Country Code From Phone Number
    const Email = payload.payment.entity.notes.email.toLowerCase(); // Email From Payload
    const TransactionID = payload.payment.entity.id; // Transaction ID From Payload
    const TransactionAmount = payload.payment.entity.amount === undefined ? 0: payload.payment.entity.amount / 100; // Transaction Amount From Payload
    const Method = payload.payment.entity.method; // Transaction Method From Payload
    const Description = payload.payment.entity.notes.description === undefined ? "No Description Provided": payload.payment.entity.notes.description; // Transaction Description From Payload

    // Check if payment is captured
    if (event === "payment.captured") {
      const AccountDetails = await AccountExistenceChecker(NumberWithoutCountryCode, Email); // Check if account exists
      const RecordStatus = await UpdateTransaction("Transaction Success", AccountDetails, Response, TransactionID, NumberWithoutCountryCode, TransactionAmount, Method, Description);
      
      // Check if Payment Record is created or not
      if(RecordStatus === false){
        return; // Return from here if payment record is not created
      }

      // Update Account Balance
      const AccountBalanceToUpdate =
        AccountDetails.Information.Data[0].Balance + TransactionAmount; // Calculate New Balance
      const AccountBalanceToUpdateStatus = await MongoDB.ClientAccount.update(
        [
          { ClientID: AccountDetails.Information.Data[0].ClientID },
          { PhoneNumber: NumberWithoutCountryCode },
          { Email: Email },
        ],
        { Balance: AccountBalanceToUpdate },
        false
      ); // Update Account Balance

      if (AccountBalanceToUpdateStatus.UpdatedCount !== 0) {
        JSONSendResponse({
          statusCode: StatusCodes.OK,
          status: true,
          message: "Success",
          Title: "Success",
          data: undefined,
          response: Response,
        }); // Send Response To Client if payment record is created
      }
    } else if (event === "payment.failed") {
      const AccountDetails = await AccountExistenceChecker(
        NumberWithoutCountryCode,
        Email
      ); // Check if account exists
      // Ready The Data To Be Inserted if Payment Failed
      const RecordStatus = await UpdateTransaction("Transaction Failed", AccountDetails, Response, TransactionID, NumberWithoutCountryCode, TransactionAmount, Method, Description);
      
        if(RecordStatus === true){
          JSONSendResponse({
            statusCode: StatusCodes.OK,
            status: true,
            message: "Success",
            Title: "Success",
            data: undefined,
            response: Response,
          }); // Send Response To Client if payment record is created
        }
    }
  } catch (error) {
    console.log(error); // Log Error
    JSONSendResponse({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: false,
      message: "Internal Server Error",
      Title: "Internal Server Error",
      data: undefined,
      response: Response,
    }); // Send Response To Client
  }
};

// This function removes the country code from a phone number.
function removeCountryCode(phoneNumber: int | any) {
  // Define a regular expression to match a country code at the beginning of the string.
  const countryCode = "+91";

  // Use the regular expression to match the country code.
  const countryCodeMatch = phoneNumber.startsWith(countryCode);

  // If a country code is found, remove it from the phone number.
  if (countryCodeMatch) {
    const phoneNumberWithoutCountryCode = phoneNumber.replace(countryCode, "");
    return phoneNumberWithoutCountryCode;
  } else {
    // No country code found, return the original phone number.
    return phoneNumber;
  }
}

// Common  Update Function for All type of Transactions in Add Money
export const UpdateTransaction = async (TransactionStatus: str, AccountDetails, Response, TransactionID, NumberWithoutCountryCode, TransactionAmount, Method, Description) => {
  try{
          // Check if account exists or not
          if (AccountDetails.status === false) {
            JSONSendResponse({
              statusCode: StatusCodes.BAD_REQUEST,
              status: false,
              message: "Account Does Not Exist",
              Title: "Account Does Not Exist",
              data: undefined,
              response: Response,
            });
            return false; // Return from here if account does not exist
          }
          // Check if transaction id is already present
          const isTransactionIDPresent =
            await MongoDB.ServerTransaction.findAndCount("AND", [
              { TransactionID: TransactionID },
              { UserClientID: AccountDetails.Information.Data[0].ClientID },
            ]);
    
          // Check if transaction id is already present
          if (isTransactionIDPresent.count > 0) {
            JSONSendResponse({
              statusCode: StatusCodes.BAD_REQUEST,
              status: false,
              message: "Transaction ID Already Present",
              Title: "Transaction ID Already Present",
              data: undefined,
              response: Response,
            });
            return false; // Return from here if transaction id is already present
          }
    
          // Ready The Data To Be Inserted if Payment Failed
          const NewPaymentRecord = { 
            UserClientID: AccountDetails.Information.Data[0].ClientID,
            UserPaymentID: AccountDetails.Information.Data[0].PaymentID,
            UserName: AccountDetails.Information.Data[0].Name,
            UserEmail: AccountDetails.Information.Data[0].Email,
            UserPhone: NumberWithoutCountryCode,
            TransactionID: TransactionID,
            TransactionDate: Date.now(),
            TransactionType: "Add Funds",
            TransactionAmount: TransactionAmount,
            TransactionDescription: Description,
            TransactionStatus: TransactionStatus,
            TransactionMethod: Method,
            TransactionFee: 0,
          }; // Ready The Data To Be Inserted if Payment Failed
    
          // Create a new payment record in Server Transaction Collection if Payment Failed
          const PaymentRecordStatus = await MongoDB.ServerTransaction.create(NewPaymentRecord );
    
          if (PaymentRecordStatus.NewCount !== 0) {
            return true;
          }
          else {
            return false;
          }
  }
  catch (error) {
    console.log(error); // Log Error
  }
};