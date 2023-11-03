/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

// This slice is used to store the account information
const AccountInfo = createSlice({
	name: 'AccountInfo',
	initialState: null,
	reducers: {
		addAccountDetails: (state, action) => {
			return action.payload;
		},
		deleteAccountDetails: (state, action) => {
			return null;
		},
		updateAccountDetails: (state, action) => {
			return action.payload;
		},
	},
});

// Export the reducer and actions from the AccountInfo slice
export const { addAccountDetails, deleteAccountDetails, updateAccountDetails } = AccountInfo.actions;
export default AccountInfo.reducer;
