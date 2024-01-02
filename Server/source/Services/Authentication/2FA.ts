// Global Types
// type str = string;
// type int = number;
// type bool = boolean;

// Import Required Modules
// import { StringKeys } from "../../settings/keys/KeysConfig.keys.settings"; // Import HTTP Status Codes
// import JWT from "../../Middleware/JWT.middleware"; // Import JWT Config
import { Request } from "express"; // Import Request from express
// // Import Required Modules
import { Console, StatusCodes, Response as Serve } from "outers"; // Import Console & Status Codes
import cryptography from "crypto"; // Import Crypto

// import Helpers
// import { Compare } from "../../Middleware/Bcrypt.middleware"; // Import Bcrypt Config
// import MongoDB from "../../settings/DB/MongoDB.db"; // Import MongoDB Instance
import Crypto from "../../Middleware/Encrypt.middleware"; // Import Encrypt Config
import { AccountExistenceChecker } from "../../utils/AC.Exist.Check.utils"; // Import Account Existence Checker

// // Import Interfaces
import { ResponseInterface } from "../../utils/Incoming.Req.Check.utils"; // Import Response Interface

export const GenerateChallengeForRegistration = async (Request: Request, Response: ResponseInterface) => {
	try {
		// Decrypt the encrypted data
		const Decrypted_Data = JSON.parse(await Crypto.Decrypt(Request.body.Encrypted_Info)); // Decrypt the encrypted data

        // Convert to Small Case Some data
        const SmallCaseData = {
            Email: Decrypted_Data.Email.toLowerCase(),
            PaymentID: Decrypted_Data.PaymentID.toLowerCase(),
        }
		// Generate a random challenge using a secure cryptographic library;
		const challengeBuffer = cryptography.randomBytes(32); // Generate a random challenge using a secure cryptographic library
		const challengeBase64 = challengeBuffer.toString('base64'); // Convert the challenge to base64

		// Find the user in the database
		const AccountDetails = await AccountExistenceChecker(Decrypted_Data.PhoneNumber, SmallCaseData.Email); // Check if the account exists
		
        // Check if the account exists
        if (AccountDetails.status === false) {
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.NOT_FOUND,
                Title: "Not Found",
                message: "Account not found with the given details",
                data: null,
                response: Response,
            }); // Send Response to Client
            return;
        }

        // Check if the user is active
        if(AccountDetails.Information.Data[0].AccountStatus !== "Active"){
            Serve.JSON({
                status: false,
                statusCode: StatusCodes.FORBIDDEN,
                Title: "Forbidden",
                message: "Account is not active to generate challenge for registration",
                data: null,
                response: Response,
            }); // Send Response to Client
            return;
        }

        // Send the challenge to the user if the all the above conditions are met
        Serve.JSON({
            status: true,
            statusCode: StatusCodes.OK,
            Title: "OK",
            message: "Challenge generated successfully",
            data: {
                Challenge: challengeBase64,
            },
            response: Response,
        }); // Send Response to Client
	} catch (error) {
		Console.red(error); // Log Error to Console
		Serve.JSON({
			status: false,
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			Title: "Internal Server Error",
			message: "Something went wrong while generating challenge for registration",
			data: null,
			response: Response,
		});
	}
};
