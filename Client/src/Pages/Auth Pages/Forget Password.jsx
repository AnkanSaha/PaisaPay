import React from 'react'; // Importing React

// Importing Components
import GeneralFooter from '@component/Footer/General Footer'; // Importing General Footer
import GeneralNavbar from '@component/Navbar/General Navbar'; // Importing General Header

// Import Functions
import {Update_Document_Title} from '@helper/Common'; // ← Common functions

export default function ForgetPassword() {
  Update_Document_Title('Forget Password'); // Updating Document Title by Calling Function
  return (
    <>
      <GeneralNavbar />
      <GeneralFooter />
    </>
  )
}
