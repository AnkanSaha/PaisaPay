import { StatusCodes, Response as Serve } from 'outers'; // Import Status Codes
import { Request } from 'express'; // Import Request from express
import JWT from './config/JWT.config'; // Import JWT Config

// types
type str = string;
type int = number;

// All Variables for send response
const AllowedMethods: str[] = ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']; // Allowed Methods

// All Interfaces
/* The `RequestInterface` interface is defining the structure of the request object that will be
received by the `CheckHeader` function. It has the following properties: */
export interface RequestInterface extends Request {
	url: str;
	method: str;
	body: {
		sessionID: str;
	};
}

export interface ResponseInterface {
	status: (statusCode: int) => {
		json: (data: object) => void;
	};
}

export interface NextInterface {
	(): void;
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

export function CheckHeader(req: RequestInterface, res: ResponseInterface, next: NextInterface) {
	if (!req.headers) {
		const ResponseContent = {
			status: false,
			statusCode: StatusCodes.FORBIDDEN,
			Title: 'Request Headers not found',
			message: 'Request Headers not found or not set',
			response: res,
			data: {
				requestedUrl: req.url,
				requestedMethod: req.method,
				requestedBody: req.body,
				requestedHeaders: req.headers,
			},
		};
		Serve.JSON(ResponseContent); // Send Response to Client
	} else if (!AllowedMethods.includes(req.method)) {
		const ResponseContent = {
			status: false,
			statusCode: StatusCodes.METHOD_NOT_ALLOWED,
			Title: 'Request Method not allowed',
			message: 'Request Method not allowed for this url, please check the url and try again',
			response: res,
			data: {
				requestedUrl: req.url,
				requestedMethod: req.method,
				requestedBody: req.body,
				requestedHeaders: req.headers,
			},
		};
		Serve.JSON(ResponseContent); // Send Response to Client
	} else {
		next(); // Go to next middleware
	}
}

// Session Validation
export const SessionValidation = async (Request: RequestInterface, Response: ResponseInterface, next: NextInterface) => {
	if (!Request.body.sessionID) {
		if (!Request.params.sessionID) {
			if (!Request.query.sessionID) {
				if(!Request.headers['sessionid']){
					Serve.JSON({
						status: false,
						statusCode: StatusCodes.UNAUTHORIZED,
						Title: 'SessionID Required',
						message: 'Session ID is required for this request, please check the url and try again',
						response: Response,
						data: {
							requestedUrl: Request.url,
							requestedMethod: Request.method,
							requestedBody: Request.body,
							requestedHeaders: Request.headers,
						},
					}); // Send Response to Client
					return; // Stop the function
				}
				else if(Request.headers['sessionid']){
					const toKenValidation = await JWT.decode(String(Request.headers['sessionid'])); // Verify Token
					if (toKenValidation.status === 'Success') {
						next(); // Go to next middleware
					} else if (toKenValidation.status === 'Invalid') {
						Serve.JSON({
							data: undefined,
							Title: 'Session Expired',
							message: 'Your session has expired, please login again',
							status: false,
							statusCode: StatusCodes.UNAUTHORIZED,
							response: Response,
						}); // Send Response to Client
						return; // Stop the function
					}
				}
			} else if (Request.query.sessionID) {
				const toKenValidation = await JWT.decode(String(Request.query.sessionID)); // Verify Token
				if (toKenValidation.status === 'Success') {
					next(); // Go to next middleware
				} else if (toKenValidation.status === 'Invalid') {
					Serve.JSON({
						data: undefined,
						Title: 'Session Expired',
						message: 'Your session has expired, please login again',
						status: false,
						statusCode: StatusCodes.UNAUTHORIZED,
						response: Response,
					}); // Send Response to Client
					return; // Stop the function
				}
			}
		} else if (Request.params.sessionID) {
			const toKenValidation = await JWT.decode(Request.params.sessionID); // Verify Token
			if (toKenValidation.status === 'Success') {
				next(); // Go to next middleware
			} else if (toKenValidation.status === 'Invalid') {
				Serve.JSON({
					data: undefined,
					Title: 'Session Expired',
					message: 'Your session has expired, please login again',
					status: false,
					statusCode: StatusCodes.UNAUTHORIZED,
					response: Response,
				}); // Send Response to Client
				return; // Stop the function
			}
		}
	} else if (Request.body.sessionID) {
		const toKenValidation = await JWT.decode(Request.body.sessionID); // Verify Token
		if (toKenValidation.status === 'Success') {
			next(); // Go to next middleware
		} else if (toKenValidation.status === 'Invalid') {
			Serve.JSON({
				data: undefined,
				Title: 'Session Expired',
				message: 'Your session has expired, please login again',
				status: false,
				statusCode: StatusCodes.UNAUTHORIZED,
				response: Response,
			}); // Send Response to Client
			return; // Stop the function
		}
	}
};
