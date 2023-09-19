/* eslint-disable no-unused-vars */
import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token

// Redux
import { useSelector } from "react-redux"; // import useSelector from react-redux

export default function Header() {
  // Redux
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  const AppName = useSelector((state) => state.GeneralAppInfo.AppDetails.Static_Details.App_Name); // get the app name from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details
  
  return (
    <>
      <h2 className="text-4xl text-green-900 text-center font-extrabold dark:text-white my-7">
        Welcome {Decoded_Account_Details.data.Name} To Your {AppName} Account
      </h2>
    </>
  );
}
