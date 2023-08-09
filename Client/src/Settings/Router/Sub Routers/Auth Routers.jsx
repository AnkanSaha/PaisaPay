import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom


// import Components & Pages
import SignupPage from "../../../Pages/Auth Pages/Signup"; // import the signup page
import LoginPage from '../../../Pages/Auth Pages/Login'; // import the login page

export default function AuthRouter() {
    return (
        <Routes>
            <Route path="/create-account" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage/>} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router