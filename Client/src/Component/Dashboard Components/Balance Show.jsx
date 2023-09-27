/* eslint-disable no-unused-vars */
import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token

// Import Custom CSS
import '@public/css/General CSS/home.css'; // import the home.css file

// Import Functions
import { ForgetPasswordFinder as AsyncBalanceUpdater } from "@helper/Auth/Authentication"; // ForgetPasswordFinder For Balance Update

// Redux
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateBalance } from "@redux/Slices/Transaction Details"; // import the action creator
import { addAccountDetails } from "@redux/Slices/Account Slice"; // import the action creator
// Icons
import {VscDebugRestart} from "react-icons/vsc"; // import the restart icon
export default function BalanceShow() {
  // Redux

    const API = useSelector(
      (state) =>
        state.GeneralAppInfo.ApplicationConfig.Frontend_Details
          .Live_URL_FOR_API_CALL
    ); // Get API Link from Redux

  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details
  const dispatch = useDispatch(); // create a dispatch variable to dispatch actions

  // Update Balance To Redux Store
  dispatch(UpdateBalance(Decoded_Account_Details.data.Balance)); // update the balance in the redux store
  const Balance = useSelector((state) => state.TransactionDetails.Balance); // get the balance from the redux store

  // Update Balance Function
  const BalanceUpdater = async (event)=>{
    event.preventDefault(); // prevent the default behavior
    const Response = await AsyncBalanceUpdater(API, Decoded_Account_Details.data.Email); // call the function for balance update
    
    // Check if the response is 200 or not
    if(Response.statusCode === 200){
      dispatch(addAccountDetails(Response.data)); // update the account details in the redux store
      const Decoded_Account_Details = decodeToken(Response.data.AccountDetails); // decode the jwt token to get the account details
      dispatch(UpdateBalance(Decoded_Account_Details.data.Balance)); // update the balance in the redux store
    }
  }
  return (
    <>
    <div className="card lg:w-52 w-44 ml-5 bg-accent-focus text-white">
  <div className="card-body">
    <h2 className="card-title">Balance</h2>
    <span className="countdown font-mono text-6xl w-full">
    ₹ <span style={{"--value":Balance,}} id="DashboardBalanceShow" ></span>  
</span>
    <div className="card-actions justify-end">
      <button className="btn btn-neutral btn-outline btn-circle btn-sm" onClick={BalanceUpdater}><VscDebugRestart /> </button>
    </div>
  </div>
</div>
    
    </>
  );
}
