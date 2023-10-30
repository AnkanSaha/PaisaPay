// import Required Modules
import React from "react"; // import React
import QRCode from "react-qr-code"; // import the QR Code component
import {Cryptography} from '@helper/Common'

// import Components
import DashboardNavbar from "@component/Navbar/Dashboard Navbar"; // import the general navbar

// import Functions
import { Update_Document_Title } from "@helper/Common"; // import the function to update the document title

// Import Components
import GeneralFooter from "@component/Footer/General Footer"; // import the general footer

// Redux
import { useSelector } from "react-redux"; // import useSelector from react-redux

// main component
export default function ViewQRCode() {
  // Hooks
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  const AppName = useSelector(
    (state) => state.GeneralAppInfo.AppDetails.Static_Details.App_Name
  ); // get the app name from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(AccountDetails.AccountDetails)); // decode the jwt token to get the account details

  Update_Document_Title("View QR Code"); // update the document title
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
      <div className="mt-5">
        <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            QR Code
          </span>{" "}
          For {Decoded_Account_Details.Name}
        </h1>
        <p className="text-lg font-normal text-center text-gray-500 lg:text-xl dark:text-gray-400">
          Scan the QR Code to make a payment to{" "}
          {Decoded_Account_Details.Name} (Only for {AppName})
        </p>
        <div className="ml-[35rem] absolute top-[16rem]">
          <QRCode value={Decoded_Account_Details.PaymentID} />
        </div>
      </div>
      <GeneralFooter FooterStyle="fixed" />
    </>
  );
} // end of main component
