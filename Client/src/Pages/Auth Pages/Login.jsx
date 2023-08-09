import React from "react"; // Importing react
import {Update_Document_Title} from '../../Helper/Common'; // ← Common functions

// Import Components here
import LoginForm from '../../Component/Auth Components/Login Components/LoginForm'; // ← Login Form Component
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // ← Navbar Component
import GeneralFooter from '../../Component/Footer/General Footer'; // ← Footer Component

export default function LoginPage (){
    Update_Document_Title(`Login`) // ← changing the title of document (page)
    return (
       <>
       <GeneralNavbar />
       <LoginForm />
       <GeneralFooter />
       </>
    )
}