import React, { useState } from 'react'; // Import react

// Import Functions
import WithdrawalVerify from '@validator/Payment/Withdrawal'; // Import Functions
import { API, Cryptography } from '@helper/Common'; // Import Functions

// Component Imports
import { Heading, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react'; // Import Heading

// Import Redux
import { useSelector } from 'react-redux'; // Import useSelector

// Import Data
import BankNames from './BankName'; // Import Bank Names

export default function WithdrawalForm() {
	// Hooks
	const ReduxState = useSelector(state => state); // Get Redux State
	const toast = useToast(); // Create Toast

	// Decrypt Account Details
	const AccountDetails = JSON.parse(Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)); // Decrypt Client ID
	const sessionID = ReduxState.AccountInfo.sessionID; // Get Session ID

	// State Variables
	const [loading, setLoading] = useState(false); // Create State Variable for Loading
	const [WithdrawalDetails, setWithdrawalDetails] = useState({
		ClientID: AccountDetails.ClientID,
		PaymentID: AccountDetails.PaymentID,
		Name: AccountDetails.Name,
		Email: AccountDetails.Email,
		Phone: AccountDetails.PhoneNumber,
		WithdrawalMethod: '',
		Amount: AccountDetails.Balance,
		BankName: '',
		AccounntHolderName: AccountDetails.Name,
		BankAccountNumber: '',
		AccountType: '',
		BranchName: '',
		IFSC: '',
	}); // Create State Variable for Withdrawal Details

	// Onchange Handler
	const OnChangeHandler = e => {
		setWithdrawalDetails({
			...WithdrawalDetails,
			[e.target.name]: e.target.value,
		}); // Set State Variable
	}; // Onchange Handler for Input Fields

	// Onclick Handler
	const OnClickHandler = async e => {
		e.preventDefault(); // Prevent Default Behaviour
		const VerificationResult = WithdrawalVerify(WithdrawalDetails); // Verify the Input Data
		if (VerificationResult.status === false) {
			toast({
				title: VerificationResult.title,
				description: VerificationResult.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			}); // Create Toast
			return;
		}
		setLoading(true); // Set Loading to True
		// Encrypt the Data
		const EncryptedData = Cryptography.EncryptSync(WithdrawalDetails); // Encrypt the Data
		const Response = await API.Post('/post/Payment/NewWithdrawal', {
			sessionID: sessionID,
			EncryptedData: EncryptedData,
		}); // Send the Data to the Server
		setLoading(false); // Set Loading to False
		if (Response.status === false) {
			toast({
				title: Response.title,
				description: Response.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			}); // Create Toast
			return;
		}
		toast({
			title: Response.title,
			description: Response.message,
			status: 'success',
			duration: 5000,
			isClosable: true,
		}); // Create Toast
	};
	return (
		<div>
			<Heading className="text-center text-cyan-700 mt-[2rem]">Fill out the form below to request a withdrawal</Heading>
			<div className="mx-48 mt-10">
				<FormControl isRequired>
					<FormLabel>Client ID</FormLabel>
					<Input name="ClientID" className="mb-5" placeholder="Enter Client ID" value={WithdrawalDetails.ClientID} disabled />
					<FormLabel>Payment ID</FormLabel>
					<Input name="PaymentID" className="mb-5" placeholder="Enter Payment ID" value={WithdrawalDetails.PaymentID} disabled />
					<FormLabel>Client Name (Bank Account Holder Name should be same)</FormLabel>
					<Input name="Name" className="mb-5" placeholder="Enter Client Name" value={WithdrawalDetails.Name} disabled />
					<FormLabel>Client Email ID</FormLabel>
					<Input name="Email" className="mb-5" placeholder="Enter Client Email ID" value={WithdrawalDetails.Email} disabled />
					<FormLabel>Client Phone Number</FormLabel>
					<Input name="Phone" className="mb-5" placeholder="Enter Client Phone Number" value={WithdrawalDetails.Phone} disabled />
					<Select
						name="WithdrawalMethod"
						className="mb-5"
						value={WithdrawalDetails.WithdrawalMethod}
						onChange={OnChangeHandler}
						placeholder="Select Withdrawal">
						<option value="IMPS"> IMPS (Immediate Payment Service) </option>
						<option value="NEFT"> NEFT (National Electronic Funds Transfer) </option>
						<option value="RTGS"> RTGS (Real Time Gross Settlement) </option>
					</Select>
					<FormLabel>Withdrawal Amount</FormLabel>
					<Input
						name="Amount"
						type="number"
						className="mb-5"
						placeholder="Enter Withdrawal Amount"
						value={WithdrawalDetails.Amount}
						onChange={OnChangeHandler}
					/>
					<FormLabel> Bank Name </FormLabel>
					<Select
						name="BankName"
						className="mb-5"
						value={WithdrawalDetails.BankName}
						onChange={OnChangeHandler}
						placeholder="Select Destination Bank Name">
						{BankNames.map((BankName, index) => {
							return (
								<option key={index} value={BankName}>
									{' '}
									{BankName}{' '}
								</option>
							);
						})}
					</Select>
					<FormLabel>Bank Account Number</FormLabel>
					<Input
						name="BankAccountNumber"
						type="number"
						className="mb-5"
						placeholder="Enter Bank Account Number"
						value={WithdrawalDetails.BankAccountNumber}
						onChange={OnChangeHandler}
					/>
					<FormLabel> Account Type </FormLabel>
					<Select
						name="AccountType"
						className="mb-5"
						value={WithdrawalDetails.AccountType}
						onChange={OnChangeHandler}
						placeholder="Select Bank Account Type">
						<option value="Savings"> Savings </option>
						<option value="Current"> Current </option>
					</Select>
					<FormLabel>Branch Name</FormLabel>
					<Input
						name="BranchName"
						type="text"
						className="mb-5"
						placeholder="Enter Branch Name"
						value={WithdrawalDetails.BranchName}
						onChange={OnChangeHandler}
					/>
					<FormLabel>IFSC Code</FormLabel>
					<Input name="IFSC" type="text" className="mb-5" placeholder="Enter IFSC Code" value={WithdrawalDetails.IFSC} onChange={OnChangeHandler} />
				</FormControl>
				<Button isLoading={loading} colorScheme="teal" size="lg" className="w-full mb-10" onClick={OnClickHandler}>
					Request Withdrawal
				</Button>
			</div>
		</div>
	);
}
