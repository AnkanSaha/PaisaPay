import { Router } from 'express'; // Import Router from express
import CORS from 'cors'; // Import CORS from cors
import { StringKeys } from '../../../settings/keys/keys'; // Import StringKeys from keys


// Setup Config
const ProfileDetails = Router(); // Setup Get_Request_Manager as Router
ProfileDetails.use(CORS({ origin: StringKeys.CORS_URL })); // Use CORS

// Import Middlewares
import {Multer} from '../../../Helper/config/multerConfig'; // Import multerConfig from multerConfig
import {SessionValidation} from '../../../Helper/Incoming Request Checker'; // Import Incoming Request Checker

// Import Functions
import {UpdateProfilePicture} from '../../../Services/User Account/Profile Details'; // Import UpdateProfilePicture from '.../.../.../Profile Details

// All Routes
ProfileDetails.put('/update-profile-picture', Multer.single('profilePicture'), SessionValidation, UpdateProfilePicture); // Use User Route

// Export Get_Request_Manager
export default ProfileDetails;
