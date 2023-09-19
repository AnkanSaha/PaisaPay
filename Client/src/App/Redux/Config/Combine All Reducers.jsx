// import Redux toolkit functions
import {combineReducers} from '@reduxjs/toolkit'; // Import the combineReducers functions from the Redux Toolkit

// import All Required Reducers here
import AccountInfoReducer from '@app/Redux/Slices/Account Slice'; // Import the slice
import {InternetStatusReducer, GeneralAppInfoReducer} from '@app/Redux/Slices/Status'; // Import the action creator
import TransactionDetails from '@app/Redux/Slices/Transaction Details'; // Import the slice for the transaction details

// Combine all the reducers into one
export default combineReducers({
    AccountInfo: AccountInfoReducer, // Reducer for the account info
    InternetStatus: InternetStatusReducer,  // Reducer for the internet status
    GeneralAppInfo: GeneralAppInfoReducer, // Reducer for the general app info
    TransactionDetails: TransactionDetails, // Reducer for the transaction details
  })
  