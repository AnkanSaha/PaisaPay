/* eslint-disable @typescript-eslint/no-explicit-any */
// Global types
type str = string;

// import Status Codes
import { StatusCodes } from "../../settings/keys/keys"; // Import HTTP Status Codes

// Import Responses
import { SendFileResponse } from "../../Helper/Response"; // Import Send Response Function

// Import Interfaces
import { RequestInterface } from "../../Helper/Incoming Request Checker"; // Import Response Interface

// Extend The Request Interface
interface FileFetchInterface extends RequestInterface {
  params: {
    ProfilePicID: str;
  };
} // Import Request Interface

// Function For File Fetch
/**
 * The function `GetProfilePic` is an asynchronous function that fetches a profile picture file and
 * sends it as a response.
 * @param {FileFetchInterface} request - The `request` parameter is an object that contains information
 * about the incoming request. It typically includes details such as the request method, headers, query
 * parameters, and request body.
 * @param {any} response - The `response` parameter is the HTTP response object that will be used to
 * send the file to the client.
 */
export async function GetProfilePic(
  request: FileFetchInterface,
  response: any
) {
  if (!request.params.ProfilePicID) {
    SendFileResponse({
      rootName: "Data/",
      response: response,
      Filename: undefined,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  } else {
    SendFileResponse({
      response: response,
      statusCode: StatusCodes.OK,
      Filename: `${request.params.ProfilePicID}`,
      rootName: "Data/",
    });
  }
}
