import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from reduxjs/toolkit

const TransactionDetails = createSlice({
    initialState : {
        Balance: 0,
        Transactions: [],
        UserProfileImageURl: "",
    },
    name: "TransactionDetails",
    reducers : {
        UpdateBalance : (state, action) => {
            state.Balance = action.payload;
        },
        UpdateTransactions : (state, action) => {
            state.Transactions = action.payload;
        },
        UpdateUserImageURl : (state, action) => {
            state.UserProfileImageURl = action.payload;
        }
    }
}); // Creating a slice

// Exports
export const {UpdateBalance, UpdateTransactions, UpdateUserImageURl} = TransactionDetails.actions; // Exporting the actions
export default TransactionDetails.reducer; // Exporting the reducer