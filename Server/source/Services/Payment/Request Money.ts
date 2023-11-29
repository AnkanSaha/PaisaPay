// type int = number; // Define int
// type str = string; // Define str

// Imports
import { Request } from "express"; // Import Request from express
// import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance
// import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker
import EncryptConfig from "../../Middleware/Encrypt.middleware"; // Import Encrypt Config
import { Console, Response as Serve, StatusCodes } from "outers"; // Import red from outers

// Import Interfaces
import { ResponseInterface } from "../../utils/Incoming.Req.Check.utils"; // Import Response Interface


export default async (Request: Request, Response: ResponseInterface) => {
    try {
        // Get Requester IP Address
        const RequesterIPaddress = Request.headers["x-forwarded-for"] || Request.connection.remoteAddress || Request.socket.remoteAddress || Request.socket.remoteAddress; // Get Requester IP Address
        const Decrypted_Data = JSON.parse(await EncryptConfig.Decrypt(Request.body.Encrypted_Request_Info)); // Decrypt Data
        Console.bright(Decrypted_Data, RequesterIPaddress); // Log Decrypted Data
        Serve.JSON(
            {
                response: Response,
                status: true,
                statusCode: StatusCodes.OK,
                Title: "Submitted Successfully",
                message: "Your request has been submitted successfully. We will get back to you soon.",
                data: undefined,
            }
        ); // Send Response to client if everything is okay
    }
    catch (Error) {
        Console.red(Error); // Log Error
        Serve.JSON({
            response: Response,
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            Title: "Internal Server Error",
            message: "Something went wrong while processing your request. Please try again later.",
            data: undefined,
        }); // Send Response
    }
};