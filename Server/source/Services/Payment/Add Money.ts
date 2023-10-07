/* eslint-disable @typescript-eslint/no-explicit-any */
type int = number; // Define int
// type str = string; // Define str

// Imports
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes, Payment_Keys } from "../../settings/keys/keys"; // Import HTTP Status Codes
// import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
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
    const { account_id, event, payload } = Request.body;

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
    const NumberWithoutCountryCode = removeCountryCode(
      payload.payment.entity.notes.phone
    ); // Remove Country Code From Phone Number
    const Email = payload.payment.entity.notes.email.toLowerCase(); // Email From Payload
    const TransactionID = payload.payment.entity.id; // Transaction ID From Payload
    const TransactionAmount = payload.payment.entity.amount / 100; // Transaction Amount From Payload
    const Method = payload.payment.entity.method; // Transaction Method From Payload

    // Check if payment is captured
    if (event === "payment.captured") {
      const AccountDetails = await AccountExistenceChecker(
        NumberWithoutCountryCode,
        Email
      ); // Check if account exists
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
        return; // Return from here if account does not exist
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
        return; // Return from here if transaction id is already present
      }

      // Ready The Data To Be Inserted
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
        TransactionDescription: "No description provided.",
        TransactionStatus: "Success",
        TransactionMethod: Method,
        TransactionFee: 0,
      };
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

      // Create a new payment record in Server Transaction Collection
      const PaymentRecordStatus = await MongoDB.ServerTransaction.create(
        NewPaymentRecord
      );

      if (
        PaymentRecordStatus.NewCount !== 0 &&
        AccountBalanceToUpdateStatus.UpdatedCount !== 0
      ) {
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
    console.log(error);
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
