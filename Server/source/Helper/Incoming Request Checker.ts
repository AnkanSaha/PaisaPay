import { StatusCodes } from "../settings/keys/keys"; // Import Status Codes
import { SendResponse, responseInterface } from "./Response"; // Import Send Response Function

// types
type str = string;
type int = number;

// All Variables for send response
let ResponseContent: responseInterface;
const AllowedMethods:str[] = ['POST', 'GET', 'PUT', 'DELETE']; // Allowed Methods

// All Interfaces
/* The `RequestInterface` interface is defining the structure of the request object that will be
received by the `CheckHeader` function. It has the following properties: */
export interface RequestInterface {
    url: str,
    method: str,
    headers: unknown,
    body: {
        sessionID: str,
    }
}

export interface ResponseInterface {
    status: (statusCode: int) => { json: (data: object) => void; },
}

interface NextInterface {
    (): void
}

// Check Request Method
/**
 * The CheckHeader function checks if the request headers exist and if the request method is allowed,
 * and sends an appropriate response if not.
 * @param {RequestInterface} req - The `req` parameter represents the request object, which contains
 * information about the incoming HTTP request such as the URL, method, body, and headers.
 * @param {ResponseInterface} res - The `res` parameter is the response object that is used to send the
 * response back to the client. It contains methods and properties that allow you to set the response
 * status code, headers, and body.
 * @param {NextInterface} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically called as `next()` to invoke
 * the next middleware function.
 */
export function CheckHeader (req:RequestInterface, res:ResponseInterface, next:NextInterface){
    if(!req.headers){
        ResponseContent = {
            status: false,
            statusCode: StatusCodes.FORBIDDEN,
            message: 'Request Headers not found',
            response: res,
            data: {
                requestedUrl: req.url,
                requestedMethod: req.method,
                requestedBody: req.body,
                requestedHeaders: req.headers
            }
        }
        SendResponse(ResponseContent); // Send Response to Client
    }
    else if(!AllowedMethods.includes(req.method)){
        ResponseContent = {
            status: false,
            statusCode: StatusCodes.METHOD_NOT_ALLOWED,
            message: 'Request Method not allowed',
            response: res,
            data: {
                requestedUrl: req.url,
                requestedMethod: req.method,
                requestedBody: req.body,
                requestedHeaders: req.headers
            }
        }
        SendResponse(ResponseContent); // Send Response to Client
    }
    else {
        next(); // Go to next middleware
    }
}