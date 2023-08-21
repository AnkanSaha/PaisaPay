import React from "react"; // import React
import { Update_Document_Title } from "../../Helper/Common"; // import the function to update the document title
import { useSelector } from "react-redux"; // import the useSelector hook
import { useNavigate } from "react-router-dom"; // import the useNavigate hook

// import Components
import GeneralNavbar from "../../Component/Navbar/General Navbar"; // import the general navbar
import GeneralFooter from "../../Component/Footer/General Footer"; // import the general footer
import ChatAnimation from "../../Component/General Components/Home Components/Chat Animation"; // import the chat animation
import Main_Text from "../../Component/General Components/Home Components/Main Text"; // import the main text

// import custom css
import "../../assets/css/General CSS/home.css"; // import the home css

function HomePage() {

  // initialize the navigate hook
  const navigate = useNavigate();

  // call the functions
  Update_Document_Title(`Home`); // update the document title
  // Load All State Values from Redux
  const ReduxState = useSelector((state) => state); // Load All State Values from Redux

  // Document Event Listeners
  document.addEventListener('keydown', event => {
    if(event.key === 'F1' || event.key === 'f1'){
      event.preventDefault(); // Prevent the default action
      navigate('/help'); // Navigate to Help Page
    }
    else if(event.key === 'F4' || event.key === 'f4'){
      event.preventDefault(); // Prevent the default action
      navigate('/about'); // Navigate to Create Account Page
    }
    else if(event.key === 'F5' || event.key === 'f5'){
      event.preventDefault(); // Prevent the default action
      navigate('/privacy'); // Navigate to Login Page
    }
  })

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
