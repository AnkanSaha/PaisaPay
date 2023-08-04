import { SendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes

// Import Interfaces
import { RequestInterface, ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Request Interface

export default async function (req: RequestInterface, res: ResponseInterface){
    SendResponse({
        status: true,
        statusCode: StatusCodes.OK,
        message: 'Signup Route',
        response: res,
        data: {
            requestedUrl: req.url,
            requestedMethod: req.method,
            requestedBody: req.body,
            requestedHeaders: req.headers
        }
    })
}