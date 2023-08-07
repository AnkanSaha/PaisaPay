// Global Types
type int = number;
type str = string;

// Import Status Codes
import { StatusCodes } from '../settings/keys/keys'; // Import HTTP Status Codes

// Find the account in the database
import MongoDB from '../settings/MongoDB/MongoDB'; // Import MongoDB Instance

// Type for Account Details
export interface AccountDetailsInterface {
    skipped: int,
    limit: int,
    count: int,
    Data: object[]
}

// Function for checking if an account exists
/**
 * The function `AccountExistenceChecker` checks if an account exists in a MongoDB database based on
 * the provided email and phone number.
 * @param {str} AccountEmail - The AccountEmail parameter is a string that represents the email address
 * of the account you want to check for existence.
 * @param {int} AccountPhoneNumber - The parameter `AccountPhoneNumber` is of type `int` and represents
 * the phone number associated with the account.
 * @returns an object with the following properties:
 * - status: a boolean indicating whether the account exists or not
 * - code: a status code indicating the result of the operation
 * - message: a message describing the result of the operation
 * - Information: an array containing account details if the account exists, otherwise an empty array
 */
export const AccountExistenceChecker = async (AccountEmail: str, AccountPhoneNumber: int) => {
    try {
        const AccountDetails: AccountDetailsInterface = await MongoDB.ClientAccount.find('OR', [{ Email: AccountEmail, PhoneNumber: AccountPhoneNumber }]); // Find the account in the database
        if (AccountDetails == null || AccountDetails == undefined || AccountDetails.Data.length == 0) {
            return {
                status: false,
                code: StatusCodes.NOT_FOUND,
                message: 'Account does not exist',
                Information: []
            }
        }
        else {
            return {
                status: true,
                code: StatusCodes.OK,
                message: 'Account exists',
                Information: AccountDetails
            }

        }
    }
    catch {
        return {
            status: false,
            message: 'Internal Server Error',
            Information: []
        }
    }
};