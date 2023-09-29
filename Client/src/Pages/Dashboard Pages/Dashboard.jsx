// import Required Modules
import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token

// Redux
import { useSelector } from "react-redux"; // import useSelector from react-redux

// import Components
import DashboardNavbar from "@component/Navbar/Dashboard Navbar"; // import the general navbar

// import Functions
import { Update_Document_Title } from "@helper/Common"; // import the function to update the document title

// Import Components
import BalanceShow from "@component/Dashboard Components/overview/Balance Show"; // import the balance show component
import Header from "@component/Dashboard Components/overview/Wellcome Header"; // import the header component

// main component
export default function Dashboard() {
  // Redux
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details

  Update_Document_Title(Decoded_Account_Details.data.Name); // update the document title
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
      <DashboardNavbar />
      <Header />
      <BalanceShow />
    </>
  );
} // end of main component
