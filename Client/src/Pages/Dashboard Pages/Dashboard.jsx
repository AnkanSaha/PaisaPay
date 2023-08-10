// import Required Modules 
import React from "react"; // import React

// import Components
import GeneralNavbar from "../../Component/Navbar/General Navbar"; // import the general navbar

// import Functions
import {Update_Document_Title} from '../../Helper/Common'; // import the function to update the document title

// import Global Details
import { AppName } from "../../App/App_Config"; // import the app name

// main component
export default function Dashboard() {
    Update_Document_Title(`Dashboard - ${AppName}`); // update the document title
    document.addEventListener('contextmenu', event => event.preventDefault()); // disable the context menu'
    window.addEventListener('beforeunload', function (e) {
   
    // Custom confirmation message
    const confirmationMessage = 'You will be logged out of the system.';

    // Most browsers require returning the confirmation message to display it
    e.returnValue = confirmationMessage;

    // Some browsers don't display the custom message but still need a return value
    return confirmationMessage;
});
    return (
        <>
        <GeneralNavbar />
        <h1>This is Dashboard</h1>
        </>
    )
} // end of main component