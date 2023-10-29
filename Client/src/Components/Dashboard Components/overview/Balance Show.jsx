/* eslint-disable no-unused-vars */
import React from "react"; // import React
import { useNavigate } from "react-router-dom"; // Import Link
import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast
import {Cryptography} from '@helper/Common'; // Import Cryptography

// Import Custom CSS
import "@public/css/General CSS/home.css"; // import the home.css file

// Local Images
import { LocalAnonymousUserLogo } from "@app/App_Config"; // import the anonymous user logo

// Import Functions
import { ForgetPasswordFinder as AsyncBalanceUpdater } from "@helper/Auth/Authentication"; // ForgetPasswordFinder For Balance Update

// Redux
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateBalance } from "@redux/Slices/Transaction Details"; // import the action creator
import { addAccountDetails } from "@redux/Slices/Account Slice"; // import the action creator

// Icons
import { AiFillCopy } from "react-icons/ai"; // import the restart icon
import { Button } from "@chakra-ui/react";

export default function BalanceShow() {
  // React State Variables
  const [isLoading, setIsLoading] = React.useState(false); // set the loading state to false

  // Redux
  const ReduxState = useSelector((state) => state); // Get All State from Redux Store
  const API = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details
        .Live_URL_FOR_API_CALL
  ); // Get API Link from Redux

  // Hooks
  const navigate = useNavigate(); // Create navigate function
  const toast = useToast(); // use toast for the toast notification

  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(AccountDetails.AccountDetails)); // decode the jwt token to get the account details
  const dispatch = useDispatch(); // create a dispatch variable to dispatch actions

  // Update Balance To Redux Store
  dispatch(UpdateBalance(Decoded_Account_Details.Balance)); // update the balance in the redux store
  const Balance = useSelector((state) => state.TransactionDetails.Balance); // get the balance from the redux store

  // Update Balance Function
  const BalanceUpdater = async () => {
    setIsLoading(true); // set the loading state to true
    const Response = await AsyncBalanceUpdater(
      API,
      Decoded_Account_Details.Email
    ); // call the function for balance update

    // Check if the response is 200 or not
    if (Response.statusCode === 200) {
      dispatch(addAccountDetails(Response.data)); // update the account details in the redux store
      const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(Response.data.AccountDetails)); // decode the jwt token to get the account details
      dispatch(UpdateBalance(Decoded_Account_Details.Balance)); // update the balance in the redux store
    }
    setIsLoading(false); // set the loading state to false
  };

  // Use Effect
  React.useEffect(()=>{
    BalanceUpdater()
  }, []); // call the balance updater function on component mount

  return (
    <>
      <div className="w-full ml-5 max-w-[18rem] mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
        <div className="lg:tooltip" data-tip={Decoded_Account_Details.AccountStatus === "Active" ? "Your Account is Active" : "Your Account is Disabled by Admin"}>
          <div className="avatar mt-5">
            <div
              className={`w-24 rounded-full ring ${
                Decoded_Account_Details.AccountStatus === "Active"
                  ? "ring-accent-focus"
                  : "ring-error"
              } ring-offset-base-100 ring-offset-2`}
            >
              <img
                src={
                  ReduxState.TransactionDetails.UserProfileImageURl
                    ? ReduxState.TransactionDetails.UserProfileImageURl
                    : LocalAnonymousUserLogo
                }
              />
            </div>
            </div>
          </div>
          <div className="flex flex-wrap space-x-2">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mt-5">
              {Decoded_Account_Details.PaymentID.toUpperCase()}
            </h5>
            <Button
              onClick={(e) => {
                e.preventDefault(); // prevent the default right click menu from showing
                // Copy the text to the clipboard
                navigator.clipboard.writeText(
                  Decoded_Account_Details.PaymentID
                );
                toast({
                  title: `Payment ID Copied`,
                  position: "top-right",
                  isClosable: true,
                });
              }}
              size={"xs"}
            >
              <AiFillCopy />
            </Button>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {" "}
            Available Balance: ₹{Balance.toFixed(2)}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Button
              onClick={BalanceUpdater}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              colorScheme="facebook"
              isLoading={isLoading}
            >
              Refresh
            </Button>
            <Button
              onClick={() => navigate("/dashboard/add-funds")}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              colorScheme="red"
            >
              Add Funds
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
