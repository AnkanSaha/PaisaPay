// Global Types
type str = string;
type int = number;

import { SendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes

// import Helpers
import AccountExistenceChecker from "../../Helper/Account Existence Checker"; // Import Account Existence Checker

// Import Interfaces
import { ResponseInterface, RequestInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Interfaces
interface SignupRequestInterface extends RequestInterface {
    body: {
        sessionID: str,
        Email: str,
        PhoneNumber: int,
        ClientID: int
    }
}

export default async function (req: SignupRequestInterface, res: ResponseInterface){
    const A = await AccountExistenceChecker(req.body.Email, req.body.PhoneNumber, req.body.ClientID)
    console.log(A)
    SendResponse({
        status: true,
        statusCode: StatusCodes.CREATED,
        message: 'Signup Successful',
        response: res,
        data: A
    })
}