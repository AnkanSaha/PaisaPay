/* eslint-disable no-unused-vars */
import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token

// Redux
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateBalance } from "@redux/Slices/Transaction Details"; // import the action creator

// Icons
import {VscDebugRestart} from "react-icons/vsc"; // import the restart icon
export default function BalanceShow() {
  // Redux
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details
  const dispatch = useDispatch(); // create a dispatch variable to dispatch actions

  // Update Balance To Redux Store
  dispatch(UpdateBalance(Decoded_Account_Details.data.Balance)); // update the balance in the redux store
  const Balance = useSelector((state) => state.TransactionDetails.Balance); // get the balance from the redux store

  const BalanceUpdater = (event)=>{
    console.log("Balance Updater");
  }
  return (
    <>
    <div className="card w-52 ml-5 bg-accent-focus text-white">
  <div className="card-body">
    <h2 className="card-title">Balance</h2>
    <span className="countdown font-mono text-6xl w-full">
    ₹ <span style={{"--value":Balance}}></span>  
</span>
    <div className="card-actions justify-end">
      <button className="btn btn-neutral btn-outline btn-circle btn-sm" onClick={BalanceUpdater}><VscDebugRestart /> </button>
    </div>
  </div>
</div>
    
    </>
  );
}
