import React from "react"; // Import React

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // import the navbar component
import RecentTransactions from "@component/Dashboard Components/Send Money/Recent Transactions"; // import the recent transactions component

// Function
export default function SendMoney() {
    return (
        <div>
            <Navbar />
            <RecentTransactions />
        </div>
    );
}