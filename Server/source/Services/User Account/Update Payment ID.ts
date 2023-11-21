/* eslint-disable @typescript-eslint/no-explicit-any */
// Global Types
// type str = string;
// type bool = boolean;
// type int = number;

// Import Required Modules
import { Request } from "express"; // Import Request from express
// Import Required Modules
import { Console, StatusCodes, Response as Serve } from "outers"; // Import Console & Status Codes


// Import Interfaces
import { ResponseInterface } from "../../utils/Incoming.Req.Check.utils"; // Import Response Interface


// Function
export default async function UpdatePaymentID (Request: Request, Response: ResponseInterface){
    try{
        console.log(Request.body);

        Serve.JSON({
            response: Response,
            status: true,
            statusCode: StatusCodes.OK,
            Title: "Payment ID Updated",
            message: "Your Payment ID Has Been Updated Successfully, You Can Now Use It To Receive Payments",
            data: undefined
        }); // Serve JSON
    }
    catch (error){
        Console.red(error); // Log Error
        Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Title: "Internal Server Error",
            message: "An Error Occured While Updating Your Payment ID, Please Try Again Later",
            data: undefined
        })
    }
}