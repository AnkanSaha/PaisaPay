import React, { useState } from 'react'; // Importing React
import { useNavigate } from 'react-router-dom'; // Import useParams from react-router-dom
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux

// Chakra-UI
import { FormControl, FormLabel, Heading, Input, Button, MenuButton, Menu, MenuList, MenuItem, useToast } from '@chakra-ui/react';

// Icons
import { IoIosArrowDropdownCircle } from 'react-icons/io'; //Importing Icons

// Functions
import { StepTwo } from '@validator/Auth/Forget Password'; // Importing StepTwo Function

export default function ForgetPasswordValidator() {
	// Hooks
	const AccountDetails = useSelector(state => state.AccountInfo.AccountDetails); // Get Account Details from Redux (Encrypted
	const Toast = useToast(); // Toast
	const Navigate = useNavigate(); // Navigate

	// States
	const [UserData, setUserData] = useState({
		Name: '',
		Email: '',
		LastFourDigitsOfIDNumber: '',
		National_ID_Type: '',
		DOB: '',
	}); // User Data

	// Decrypting
	const DecryptedToken = AccountDetails; // Decrypting Token

	// Functions
	const VerifyUserDetails = () => {
		const Result = StepTwo(DecryptedToken, UserData); // Calling StepTwo Function
		if (Result === false) {
			Toast({
				title: 'Error',
				description: 'Please Enter Correct Details',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} else if (Result === true) {
			Toast({
				title: 'Verified',
				description: 'User Details Verified with our Database',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			Navigate("/auth/reset-password/Update"); // Navigate to Reset Password Page
		}
	}; // Verify User Details

	const OnChange = e => {
		const { name, value } = e.target; // Get Name and Value from Target
		setUserData(PreviousData => ({
			...PreviousData,
			[name]: value,
		})); // Set User Data
	};
	return (
		<>
			<Heading className="text-center font-mono mt-5">Verify User Details To Reset Password (Step 2 of 3)</Heading>
			<div className="w-6/12 m-auto mt-10 mb-10">
				<FormControl className="space-y-5" isRequired>
					<FormLabel>Email address of User</FormLabel>
					<Input type="email" name="Email" placeholder="ex: ankan@company.com" value={UserData.Email} onChange={OnChange} />
					<FormLabel>Name of User</FormLabel>
					<Input type="text" placeholder="ex: Ankan Saha" value={UserData.Name} name="Name" onChange={OnChange} />
					<Menu>
						<MenuButton as={Button} rightIcon={<IoIosArrowDropdownCircle />}>
							{UserData.National_ID_Type === '' ? 'Select National ID Type' : UserData.National_ID_Type}
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() =>
									setUserData(PreviousData => ({
										...PreviousData,
										National_ID_Type: 'Adhaar Card',
									}))
								}>
								Adhaar Card
							</MenuItem>
							<MenuItem
								onClick={() =>
									setUserData(PreviousData => ({
										...PreviousData,
										National_ID_Type: 'Voter Card',
									}))
								}>
								National Voter Card
							</MenuItem>
							<MenuItem
								onClick={() =>
									setUserData(PreviousData => ({
										...PreviousData,
										National_ID_Type: 'PAN Card',
									}))
								}>
								PAN Card
							</MenuItem>
							<MenuItem
								onClick={() =>
									setUserData(PreviousData => ({
										...PreviousData,
										National_ID_Type: 'Passport',
									}))
								}>
								Passport
							</MenuItem>
						</MenuList>
					</Menu>

					<FormLabel>Last Four Digits of ID Number</FormLabel>
					<Input type="text" placeholder="ex: 1234" name="LastFourDigitsOfIDNumber" onChange={OnChange} value={UserData.LastFourDigitsOfIDNumber} />
					<FormLabel>Select Date of Birth of User</FormLabel>
					<Input placeholder="Select Date of Birth of User" size="md" type="date" name="DOB" onChange={OnChange} />
					<Button colorScheme="teal" className="w-full" size="lg" onClick={VerifyUserDetails}>
						Verify User Details
					</Button>
				</FormControl>
			</div>
		</>
	);
}
