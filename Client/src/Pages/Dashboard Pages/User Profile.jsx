import React from "react"; // import react

// Import Components
import Navbar from "@component/Navbar/Dashboard Navbar"; // import the navbar component
import BalanceShow from '@component/Dashboard Components/overview/Balance Show'; // import the balance show component
import ProfileDetails from "@component/Dashboard Components/User Profile/Profile Details"; // import the profile details component
import Footer from '@component/Footer/General Footer'; // import the footer component

// import Functions
import { Update_Document_Title } from "@helper/Common"; // import the function to update the document title

export default function UserProfile(){
    Update_Document_Title("User Profile"); // update the document title
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
        <BalanceShow />
        <ProfileDetails />
        <Footer FooterStyle="fixed"/>
        </>
    )
} // export the add money page