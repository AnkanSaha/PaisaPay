import { Router } from "express"; // Import Router from express

// Setup Config
const ProfileDetails = Router(); // Setup Get_Request_Manager as Router

// Import Middlewares
import { Multer } from "../../../Middleware/multer.middleware"; // Import multerConfig from multerConfig
import { StringKeys } from "../../../settings/keys/KeysConfig.keys.settings"; // Import String Keys

// Middlewares
import { Middleware } from "outers"; // Import Middleware from outers


// Import Functions
import { UpdateProfilePicture } from "../../../Services/User Account/Profile Details"; // Import UpdateProfilePicture from '.../.../.../Profile Details
import { UpdateTransactionPIN } from "../../../Services/User Account/Update Transaction PIN"; // Import UpdateTransactionPIN from '.../.../.../Update Transaction PIN'
import UpdatePaymentID from "../../../Services/User Account/Update Payment ID"; // Import UpdatePaymentID from '.../.../.../Update Payment ID'
import UpdateDemographicInfo from "../../../Services/User Account/Update Demographic Info"; // Import UpdateDemographicInfo from '.../.../.../Update Demographic Info'
import UpdatePassword from "../../../Services/User Account/Update Password"; // Import UpdatePassword from '.../.../.../Update Password'

// All Routes
ProfileDetails.put("/update-profile-picture", Multer.single("profilePicture"), Middleware.JWTValidator(StringKeys.JWT_FieldName, StringKeys.JWT_SECRET), UpdateProfilePicture); // Use User Route
ProfileDetails.put("/transaction-pin", UpdateTransactionPIN); // Use The Update Transaction PIN Route
ProfileDetails.put("/update-PaymentID", UpdatePaymentID); // Use The Update Payment ID Route
ProfileDetails.put("/update-Demographic-Info", UpdateDemographicInfo); // use the Update UpdateDemographicInfo Route
ProfileDetails.put("/update-password", UpdatePassword); // use the Update UpdateDemographicInfo Route

// Export Get_Request_Manager
export default ProfileDetails;
