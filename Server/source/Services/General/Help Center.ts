// Global Type Declarations
type str = string; // Type Declaration for string

import { Request } from "express"; // Import Request from express

// Import Required Modules
import { JSONSendResponse } from "../../Helper/Response"; // Import Send Response Function
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes
import { randomWord } from "uniquegen"; // Import Unique ID Generator
import JWT from "../../Helper/config/JWT.config"; // Import JWT Config

// Import Helpers
import MongoDB from "../../settings/MongoDB/MongoDB"; // Import MongoDB Instance

// Import Interfaces
import { ResponseInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Interface for Request
interface RequestInterface extends Request {
  body: {
    TicketTitle?: str;
    TicketDescription?: str;
    ClientID?: str;
    CurrentClientDetails?: object;
  };
}

/**
 * The HelpCenterService function handles the creation of a ticket in a help center system, validating
 * the request body and saving the ticket data to a database.
 * @param {RequestInterface} request - The `request` parameter is an object that contains the incoming
 * HTTP request data. It includes information such as the request method, headers, URL, and body.
 * @param {ResponseInterface} response - The `response` parameter is an object that represents the HTTP
 * response that will be sent back to the client. It is used to send the response data, status code,
 * and headers back to the client.
 * @returns The function does not explicitly return anything. However, it sends a JSON response using
 * the `JSONSendResponse` function. The response includes data such as the status, message, and
 * statusCode.
 */
export default async function HelpCenterService(
  request: RequestInterface,
  response: ResponseInterface
) {
  try {
    const { ClientID, TicketDescription, TicketTitle, CurrentClientDetails } =
      request.body; // Destructure the request body
    if (
      !ClientID ||
      !TicketDescription ||
      !TicketTitle ||
      !CurrentClientDetails
    ) {
      // Check if the request body is valid
      JSONSendResponse({
        data: undefined,
        Title: "Information Missing in Request",
        message: "Please provide all the required information & try again",
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        response: response,
      });
      return; // Return if the request body is invalid
    } else {
      // Encrypt the request data
      const TicketTitle = await JWT.generate(request.body.TicketTitle);
      const TicketDescription = await JWT.generate(
        request.body.TicketDescription
      );

      const RequestDataToBeSave = {
        ClientID: ClientID,
        TicketID: await randomWord(15, true),
        TicketTitle: TicketTitle.toKen,
        TicketDescription: TicketDescription.toKen,
        TicketStatus: "Pending",
        CurrentClientDetails: CurrentClientDetails,
        RequestDate: Date.now(),
      }; // Create the request data to be saved

      // Save the request data to the database
      const DBResult = await MongoDB.HelpCenter.create(RequestDataToBeSave); // Save the request data to the database

      // Check if the request data was saved successfully
      if (DBResult.status === true) {
        JSONSendResponse({
          data: undefined,
          Title: "Ticket Created Successfully",
          message:
            "Your ticket has been created successfully, we will get back to you soon",
          status: true,
          statusCode: StatusCodes.CREATED,
          response: response,
        });
      } else {
        JSONSendResponse({
          data: undefined,
          Title: "Ticket Creation Failed",
          message: "Your ticket could not be created, please try again",
          status: false,
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          response: response,
        });
      }
    }
  } catch (error) {
    console.log(error);
    JSONSendResponse({
      data: undefined,
      Title: "Internal Server Error",
      message:
        "An error occurred while processing your request, please try again",
      status: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      response: response,
    }); // Send an empty response
  }
}
