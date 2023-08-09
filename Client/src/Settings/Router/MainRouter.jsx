import React from "react"; // import React module
// Desc: Router for the application
import { Routes, Route } from "react-router-dom"; // import the React router DOM module

// import All Pages
import HomePage from "../../Pages/General Pages/Home";

// Import Error Handler
import DashboardErrorHandler from "../Error Handlers/Dashboard Error Handler"; // import the dashboard error handler
import AuthErrorHandler from "../Error Handlers/Auth Error Handlers"; // import the auth error handler

// No Page Found Component
import NotLoggedIn_Offline from "../../Pages/Common Pages/Not Loggedin"; // import the not logged in and offline page for No Page Found error


// Router Function
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<DashboardErrorHandler />} />
      <Route path="/auth/*" element={<AuthErrorHandler />} />
      <Route path="*" element={<NotLoggedIn_Offline Status="No Page Found" Message="Seems like the page you are looking for is not available. Please check the URL and try again." ButtonText="Go Home" ButtonLink="/" />} />
    </Routes>
  );
} // export the router
