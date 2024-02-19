// Global Type Declarations
// type str = string; // Type Declaration for string

import { Request, Response } from "express"; // Import Request from express
// import { Console, StatusCodes, Serve, methods } from "outers"; // Import red from outers

export default async function IPAddressInfoService(request: Request, response: Response) {
	try {
		console.log(request.headers, response.send);
	} catch (error) {
		console.error(error);
	}
}
