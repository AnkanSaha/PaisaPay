import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom


// import Components & Pages
import SignupPage from "../../../Pages/Auth Pages/Signup"; // import the signup page
import LoginPage from '../../../Pages/Auth Pages/Login'; // import the login page
import ForgetPasswordPage from '../../../Pages/Auth Pages/Forget Password'; // import the forget password page

export default function AuthRouter() {
    return (
        <Routes>
            <Route path="/create-account" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/forget-password' element={<ForgetPasswordPage/>} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router