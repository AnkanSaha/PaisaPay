import React from 'react' // Importing React

// Importing Components
import GeneralNavbar from '@component/Navbar/General Navbar' // Importing General Header
import ForgetPasswordValidator from '@component/Auth Components/Forget Password Components/Forget Password Validator'

// Import Functions
import { Update_Document_Title } from '@helper/Common' // ← Common functions

export default function ForgetPassword () {
  Update_Document_Title('Forget Password | Section 2')
  return (
    <>
      <GeneralNavbar />
      <ForgetPasswordValidator />
    </>
  )
}
