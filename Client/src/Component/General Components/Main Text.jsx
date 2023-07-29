import React from 'react'
import Typed from "typed.js"; // Import Typed.js
import { AppName } from "../../App/App_Config"; // import the app name
import { useSelector } from "react-redux"; // import the useSelector hook

import { useNavigate } from "react-router-dom"; // import the useNavigate hook

// Import Material UI
import { Button } from "@chakra-ui/react"; // import the button component


export default function Main_Text() {
     // Create Animation for this page
  // Create reference to store the DOM element containing the animation
  const MainTextAnimation = React.useRef(null);
  React.useEffect(() => {
    console.log(AppName);
    const typed = new Typed(MainTextAnimation.current, {
      strings: [
        `Welcome to ${AppName}`,
        "A P2P Payment Network",
        "Easy Way to Send Money",
        "Fast, Secure, and Reliable",
      ],
      typeSpeed: 100,
      loop: true,
      fadeOut: true,
      cursorChar: "_",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

    // initialize the hook
    const navigate = useNavigate(); // initialize the navigate hook

    // Load All State Values from Redux
    const ReduxState = useSelector((state) => state); // Load All State Values from Redux
  
  

  return (
   <>
     <h1 className="herotext text-center text-white text-2xl font-semibold lg:text-6xl mt-[5.25rem] lg:mt-[8.25rem]">
          <span ref={MainTextAnimation}></span>
        </h1>
        <Button
          className="lg:ml-[34.25rem] ml-[3rem] mt-[6.25rem]"
          size={"lg"}
          colorScheme="whiteAlpha"
          onClick={() => navigate("/auth/create-account")}
        >
          Get Started with{" "}
          {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name}
        </Button>
   </>
  )
}
