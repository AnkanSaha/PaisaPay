import React from "react"; // Import react

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // Import Dashboard Navbar
import WithdrawalForm from "@component/Dashboard Components/Withdrawal/Withdrawal Form"; // Import Withdrawal Form

export default function Withdrawal() {
    return (
        <div>
            <Navbar/>
            <WithdrawalForm />
        </div>
    );
}