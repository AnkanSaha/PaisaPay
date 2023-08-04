// types
type str = string;
type obj = object;
type int = number;
type bool = boolean;

// interfaces
/* The `interface responseInterface` is defining the structure of an object that has the following
properties: */
export interface responseInterface {
    response: {
        status: (statusCode: int) => {
            json: (data: obj) => void
        }
    },
    status: bool,
    statusCode: int,
    message: str,
    data: obj | undefined
}

/**
 * The SendResponse function sends a JSON response with the specified status, status code, message, and
 * data.
 * @param {responseInterface}  - - `status`: The status of the response (e.g., "success" or "error").
 */
export const SendResponse = ({ status, statusCode, message, response, data }: responseInterface) => {
    response.status(statusCode).json({
        status: status,
        statusCode: statusCode,
        message: message,
        data: data
    }); 
};