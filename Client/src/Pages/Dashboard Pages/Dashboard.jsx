// import Required Modules 
import React from "react"; // import React

// import Components
import DashboardNavbar from "../../Component/Navbar/Dashboard Navbar"; // import the general navbar

// import Functions
import {Update_Document_Title} from '../../Helper/Common'; // import the function to update the document title

// main component
export default function Dashboard() {
    Update_Document_Title(`Dashboard`); // update the document title
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
        <DashboardNavbar />
        <h1>This is Dashboard</h1>
        </>
    )
} // end of main component