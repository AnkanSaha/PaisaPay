import React from 'react'; // Importing React

// Importing Components
import GeneralFooter from '../../Component/Footer/General Footer'; // Importing General Footer
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // Importing General Header

// Import Functions
import {Update_Document_Title} from '../../Helper/Common'; // ← Common functions

export default function ForgetPassword() {
  Update_Document_Title('Forget Password'); // Updating Document Title by Calling Function
  return (
    <>
      <GeneralNavbar />
      <GeneralFooter />
    </>
  )
}
