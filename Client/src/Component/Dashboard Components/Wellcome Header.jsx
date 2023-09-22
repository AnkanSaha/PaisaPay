/* eslint-disable no-unused-vars */
import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token
import Typed from "typed.js"; // Import Typed.js

// Components
import { Heading, useToast } from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux"; // import useSelector from react-redux

export default function Header() {
  // Toast
  const toast = useToast(); // use toast for the toast notification
  // Redux
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  const AppName = useSelector(
    (state) => state.GeneralAppInfo.AppDetails.Static_Details.App_Name
  ); // get the app name from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details

  // Reference to store the DOM element containing the animation
  const MainTextAnimation = React.useRef(null);

  // Create Animation for this page
  React.useEffect(() => {
    const typed = new Typed(MainTextAnimation.current, {
      strings: [
        `Your Unique Payment ID is ${Decoded_Account_Details.data.PaymentID}`,
      ],
      typeSpeed: 40,
      loop: false,
      backSpeed: 10,
      cursorChar: "",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Heading className="my-7">
        <h2
          id="MainTextAnimation"
          onContextMenu={(e) => {
            e.preventDefault(); // prevent the default right click menu from showing
            // Copy the text to the clipboard
            navigator.clipboard.writeText(
              Decoded_Account_Details.data.PaymentID
            );
            toast({
              title: `Payment ID Copied`,
              position: "top-right",
              isClosable: true,
            });
          }}
          className="text-sm lg:text-4xl text-green-900 text-center font-extrabold dark:text-white "
          ref={MainTextAnimation}
        ></h2>
      </Heading>
    </>
  );
}
