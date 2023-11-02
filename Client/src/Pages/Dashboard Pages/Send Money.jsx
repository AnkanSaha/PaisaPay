import React from "react"; // Import React

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // import the navbar component
import RecentTransactions from "@component/Dashboard Components/Send Money/Recent Transactions"; // import the recent transactions component

// Import Factions
import {Update_Document_Title} from '@helper/Common'; // import the common functions


// Function
export default function SendMoney() {
    // Update Document Title
    Update_Document_Title('Send Money'); // update the document title

    document.addEventListener("contextmenu", (event) => event.preventDefault()); // disable the context menu'
  
    window.addEventListener("beforeunload", function (e) {
      // Custom confirmation message
      const confirmationMessage = "You will be logged out of the system.";
  
      // Most browsers require returning the confirmation message to display it
      e.returnValue = confirmationMessage;
  
      // Some browsers don't display the custom message but still need a return value
      return confirmationMessage;
    });
    
    return (
        <div>
            <Navbar />
            <RecentTransactions />
        </div>
    );
}