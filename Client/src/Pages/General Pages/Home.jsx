import React from "react"; // import React
import { Update_Document_Title } from "../../Helper/Common"; // import the function to update the document title
import { useSelector } from "react-redux"; // import the useSelector hook

// import Components
import GeneralNavbar from "../../Component/Navbar/General Navbar"; // import the general navbar
import GeneralFooter from "../../Component/Footer/General Footer"; // import the general footer
import ChatAnimation from "../../Component/General Components/Home Components/Chat Animation"; // import the chat animation
import Main_Text from "../../Component/General Components/Home Components/Main Text"; // import the main text

// import custom css
import "../../assets/css/General CSS/home.css"; // import the home css

function HomePage() {
  // call the functions
  Update_Document_Title(`Home`); // update the document title
  // Load All State Values from Redux
  const ReduxState = useSelector((state) => state); // Load All State Values from Redux

  // Footer Style for this page
  let FooterStyle = "static";
  ReduxState.GeneralAppInfo.ClientDetails.ClientDeviceDetails
    .Device_DetailsDeviceType === "Mobile"
    ? (FooterStyle = "static")
    : (FooterStyle = "fixed");
  return (
    <div className="bg-black min-h-screen">
    <>
      <GeneralNavbar Text="Dashboard" Link="/dashboard" />
      <Main_Text />
      <ChatAnimation />
      <GeneralFooter FooterStyle={FooterStyle} />
    </>
    </div> // if the user is not logged in then display the not logged in component
  );
}

export default HomePage; // export the component
