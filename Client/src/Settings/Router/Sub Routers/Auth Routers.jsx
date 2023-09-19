import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom

// No Page Found Component
import PageNotFound from "@page/Common Pages/Page Not Found"; // import the not logged in and offline page for No Page Found error

// import Components & Pages
import SignupPage from "@page/Auth Pages/Signup"; // import the signup page
import LoginPage from '@page/Auth Pages/Login'; // import the login page
import ForgetPasswordPage from '@page/Auth Pages/Forget Password'; // import the forget password page

export default function AuthRouter() {
    return (
        <Routes>
            <Route path="/create-account" element={<SignupPage />} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/forget-password' element={<ForgetPasswordPage/>} />
            <Route path="*" element={<PageNotFound Status="No Page Found" Message="Seems like the page you are looking for is not available. Please check the URL and try again." ButtonText="Go Home" ButtonLink="/" />} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router