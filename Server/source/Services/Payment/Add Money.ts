/* eslint-disable @typescript-eslint/no-explicit-any */
type int = number; // Define int
// type str = string; // Define str

// Imports
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes, Payment_Keys } from "../../settings/keys/keys"; // Import HTTP Status Codes
// import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
import { Request } from "express"; // Import Request from express
// import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
// import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface


export const AddMoney = async (Request:Request, Response:ResponseInterface)=> {
    try {
        const {account_id, event, payload} = Request.body;

        // Check if account id is valid & payment done by merchant
        if(account_id.replace("acc_", "") !== Payment_Keys.MERCHANT_ID){
            JSONSendResponse({statusCode:StatusCodes.BAD_REQUEST, status:false, message:"Invalid Account ID", Title:"Invalid Account ID", data:undefined, response:Response})
            return; // Return from here if account id is invalid
        }

        // Check if service is PaisaPay
        if(payload.payment.entity.notes.choose_service !== "PaisaPay Services"){
            JSONSendResponse({statusCode:StatusCodes.BAD_REQUEST, status:false, message:"Invalid Service", Title:"Invalid Service", data:undefined, response:Response})
            return; // Return from here if service is invalid
        }

        // Check if payment is captured
        if(event === "payment.captured"){
            const NumberWithoutCountryCode = removeCountryCode(payload.payment.entity.notes.phone);
            console.log(NumberWithoutCountryCode);
            JSONSendResponse({statusCode:StatusCodes.OK, status:true, message:"Success", Title:"Success", data:undefined, response:Response})
        }
    }
    catch (error) {
        console.log(error);
    }
}

// This function removes the country code from a phone number.
function removeCountryCode(phoneNumber: int | any) {
    // Define a regular expression to match a country code at the beginning of the string.
    const countryCode = "+91";
    
    // Use the regular expression to match the country code.
    const countryCodeMatch = phoneNumber.startsWith(countryCode);
    
    // If a country code is found, remove it from the phone number.
    if (countryCodeMatch) {
      const phoneNumberWithoutCountryCode = phoneNumber.replace(countryCode, '');
      return phoneNumberWithoutCountryCode;
    } else {
      // No country code found, return the original phone number.
      return phoneNumber;
    }
  }
