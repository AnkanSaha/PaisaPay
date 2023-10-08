// import Required Modules
import React from "react"; // import React

// Components
import Navbar from "@component/Navbar/Dashboard Navbar"; // import the general navbar component
import PaymentHistoryS from "@component/Dashboard Components/Payment History/Show Payment History";

// Main Function
export default function PaymentHistory() {
    return (
        <>
        <Navbar />
        <PaymentHistoryS />
        </>
    );
}