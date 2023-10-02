import React from 'react'
import Typed from "typed.js"; // Import Typed.js
import { AppName, Cache } from "@app/App_Config"; // import the app name

// Import Redux Store
import { useDispatch } from "react-redux"; // import the useSelector hook
import {addAccountDetails} from '@redux/Slices/Account Slice'; // Importing Account Slice


import { useNavigate } from "react-router-dom"; // import the useNavigate hook

// Import Material UI
import { Button } from "@chakra-ui/react"; // import the button component


export default function Main_Text() {
     // Create Animation for this page
  // Create reference to store the DOM element containing the animation
  const MainTextAnimation = React.useRef(null);
  React.useEffect(() => {
    const typed = new Typed(MainTextAnimation.current, {
      strings: [
        `Welcome to ${AppName}`,
        "A P2P Payment Network",
        "Easy Way to Send Money",
        "Fast, Secure, and Reliable",
      ],
      typeSpeed: 60,
      loop: true,
      backSpeed: 10,
      cursorChar: "_",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

    // initialize the hook
    const navigate = useNavigate(); // initialize the navigate hook  
    const Dispatch = useDispatch(); // initialize the useDispatch hook

    // Load Cache Account Data
    const LoadAccountData = async () => {
      const LoginToken =await Cache.Account.GetCache('Login_Token');
      const AccountDetails = await Cache.Account.GetCache('Account_Details');
      const Details = {
        LoginToken: LoginToken.Code === 404 ? null : LoginToken.data,
        AccountDetails: AccountDetails.Code === 404 ? null : AccountDetails.data
      } // Create Details Object to be added to Redux Store
      Dispatch(addAccountDetails(Details)); // Add Account Details to Redux Store
    }
    LoadAccountData();
  return (
   <>
     <h1 className="herotext text-center text-white text-xl font-semibold lg:text-6xl mt-[5.25rem] lg:mt-[8.25rem]">
          <span ref={MainTextAnimation}></span>
        </h1>
        <Button
          className="herosubtext lg:ml-[39.25rem] ml-[5rem] mt-[4.25rem] lg:mt-[6.25rem]"
          size={"lg"}
          colorScheme="whiteAlpha"
          onClick={() => navigate("/auth/create-account")}
        >
          Get Started
        </Button>
   </>
  )
}
