// Import The Bcrypt module
import { hash, compare } from 'bcryptjs'; // Import Bcrypt

// Import Status Codes
import { StatusCodes } from 'outers'; // Import Status Codes

// Global Types
type str = string;
type int = number;
type obj = object;
type bool = boolean;

// Encrypt Password

/**
 * The function `EncryptPassword` takes a password and the number of rounds for encryption, and returns
 * an object with the encrypted password and status information.
 * @param {str} Password - The `Password` parameter is a string that represents the password that needs
 * to be encrypted.
 * @param {int} Rounds - The "Rounds" parameter is an integer that determines the number of times the
 * password will be hashed. A higher number of rounds increases the security of the encrypted password
 * but also increases the time it takes to encrypt the password. It is recommended to use a value that
 * provides a good balance between security and
 * @returns an object with the following properties:
 * - status: a boolean value indicating the success or failure of the encryption process
 * - statusCode: a numeric value indicating the status code of the response
 * - message: a string message indicating the result of the encryption process
 * - EncryptedPassword: the encrypted password, obtained by hashing the original password with the
 * specified number of rounds.
 */
export const Encrypt = async (Password: str, Rounds: int): Promise<obj> => {
    try {
        return {
            status: true,
            statusCode: StatusCodes.OK,
            message: 'Encrypted Successfully',
            EncryptedData: await hash(Password, Rounds)
        }
    }
    catch {
        return {
            status: false,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            EncryptedPassword: ''
        }
    }
};


/**
 * The function `ComparePassword` compares a user's password with an encrypted password and returns a
 * result indicating whether they match or not.
 * @param {str} UserPassword - The UserPassword parameter is the plain text password entered by the
 * user.
 * @param {str} EncryptedPassword - The `EncryptedPassword` parameter is the password that has been
 * previously encrypted or hashed using a cryptographic algorithm. It is the stored password in the
 * database or any other storage medium.
 * @returns an object with the following properties:
 */

interface ComparePasswordInterface {
    status: bool,
    statusCode: int,
    isMatch: bool,
    message?: str
}

export const Compare = async (UserPassword: str, EncryptedPassword: str): Promise<ComparePasswordInterface> => {
    try{
        const CompareResult: bool = await compare(UserPassword, EncryptedPassword); // Compare Password
        return {
            status: true,
            statusCode: StatusCodes.OK,
            isMatch: CompareResult,
        }

    } catch (error) {
      return {
        status: false,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        isMatch: false
      }
    }
};