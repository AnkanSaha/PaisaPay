import React from "react"; // import react
import { Routes, Route } from "react-router-dom"; // import the routes component from react-router-dom


// import Components & Pages

export default function AuthRouter() {
    return (
        <Routes>
            <Route path="/create-account" element={<>This is Auth Page</>} />
            <Route path='/login' element={<>This is Auth Page</>} />
        </Routes>
    ); // return the dashboard router
} // export the dashboard router