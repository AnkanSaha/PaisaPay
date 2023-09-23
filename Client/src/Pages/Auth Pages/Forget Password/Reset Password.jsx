import React from 'react'; // Importing React

// Importing Components
import GeneralNavbar from '@component/Navbar/General Navbar'; // Importing General Header
import ResetPassword from '@component/Auth Components/Forget Password Components/Reset Password';

// Import Functions
import {Update_Document_Title} from '@helper/Common'; // ← Common functions

export default function ResetPasswordPage() {
  Update_Document_Title('Reset Password '); // Updating Document Title by calling Update_Document_Title function
  return (
    <>
      <GeneralNavbar />
      <ResetPassword />
    </>
  )
}
