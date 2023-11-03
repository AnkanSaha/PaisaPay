export default InputData => {
	if (InputData.WithdrawalMethod === '' || InputData.WithdrawalMethod === undefined || InputData.WithdrawalMethod === null) {
		return {
			status: false,
			title: 'Error, Withdrawal Method',
			message: 'Please select the withdrawal method',
		};
	} else if (InputData.BankName === '' || InputData.BankName === undefined || InputData.BankName === null) {
		return {
			status: false,
			title: 'Error, Bank Name',
			message: 'Please enter the bank name',
		};
	} else if (InputData.BankAccountNumber === '' || InputData.BankAccountNumber === undefined || InputData.BankAccountNumber === null) {
		return {
			status: false,
			title: 'Error, Bank Account Number',
			message: 'Please enter the bank account number',
		};
	} else if (InputData.AccountType === '' || InputData.AccountType === undefined || InputData.AccountType === null) {
		return {
			status: false,
			title: 'Error, Account Type',
			message: 'Please select the account type',
		};
	} else if (InputData.BranchName === '' || InputData.BranchName === undefined || InputData.BranchName === null) {
		return {
			status: false,
			title: 'Error, Branch Name',
			message: 'Please enter the branch name',
		};
	} else if (InputData.IFSC === '' || InputData.IFSC === undefined || InputData.IFSC === null) {
		return {
			status: false,
			title: 'Error, IFSC Code',
			message: 'Please enter the IFSC code',
		};
	} else {
		return {
			status: true,
			title: 'Validation Successful',
			message: 'Validation Successful for Withdrawal, Sending Data to the Server',
		};
	}
};
