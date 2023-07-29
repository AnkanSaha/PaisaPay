import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom


// import Components & Pages
import Dashboard from "../../../Pages/Dashboard Pages/Dashboard"; // import the dashboard page

export default function DashboardRouter() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router