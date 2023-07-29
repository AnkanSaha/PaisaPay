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
    return (
        <>
        <GeneralNavbar />
        <h1>This is Dashboard</h1>
        </>
    )
} // end of main component