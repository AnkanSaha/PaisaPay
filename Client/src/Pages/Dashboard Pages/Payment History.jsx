// import Required Modules
import React from "react"; // import React

// Components
import Navbar from "@component/Navbar/Dashboard Navbar"; // import the general navbar component
import PaymentHistoryS from "@component/Dashboard Components/Payment History/Show Payment History";

// import Functions
import { Update_Document_Title } from "@helper/Common"; // import the function to update the document title

// Main Function
export default function PaymentHistory() {
    // Update Document Title
    Update_Document_Title("Payment History");
    return (
        <>
        <Navbar />
        <PaymentHistoryS />
        </>
    );
}