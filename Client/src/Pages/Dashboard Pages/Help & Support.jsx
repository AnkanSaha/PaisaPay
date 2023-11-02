import React from "react"; // import react for the function component

// Components
import Navbar from "@component/Navbar/Dashboard Navbar"; // import the general navbar component
import HelpAndSupport from "../../Components/Dashboard Components/Help & Support/Help & Support"; // import the help and support component

// import Functions
import { Update_Document_Title } from "@helper/Common"; // import the function to update the document title


export default function HelpAndSupportPage() {
  console.log(HelpAndSupport)
    // Update the document title using the imported function
    Update_Document_Title("Help & Support"); // update the document title

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
        <>
        <Navbar />
        <HelpAndSupport/>
        </>
    )
}