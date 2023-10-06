// type int = number; // Define int
// type str = string; // Define str

// Imports
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes, } from "../../settings/keys/keys"; // Import HTTP Status Codes
// import JWT from "../../Helper/config/JWT.config"; // Import JWT Config
import { Request } from "express"; // Import Request from express
// import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance
// import { AccountExistenceChecker } from "../../Helper/Account Existence Checker"; // Import Account Existence Checker

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface


export const AddMoney = async (Request:Request, Response:ResponseInterface)=> {
    try {
        console.log(Request.body);
        JSONSendResponse({statusCode:StatusCodes.OK, status:true, message:"Success", Title:"Success", data:undefined, response:Response})
    }
    catch (error) {
        console.log(error);
    }
}