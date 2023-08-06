// Global Types
type int = number;
type str = string;

// Find the account in the database
import MongoDB from '../settings/MongoDB/MongoDB'; // Import MongoDB Instance

// Type for Account Details
type AccountDetails = {
    skipped: int,
    limit: int,
    count: int,
    Data: object[]
}

// Function for checking if an account exists
export default async (AccountEmail: str, AccountPhoneNumber: int, ClientID: int) => {
    try {
        const AccountDetails: AccountDetails = await MongoDB.ClientAccount.find([{ Email: AccountEmail, PhoneNumber: AccountPhoneNumber, ClientID: ClientID }]); // Find the account in the database
        console.log(AccountDetails)
        if (AccountDetails == null || AccountDetails == undefined || AccountDetails.Data.length == 0) {
            return {
                status: false,
                message: 'Account does not exist',
                Information: []
            }
        }
        else {
            return {
                status: true,
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
}