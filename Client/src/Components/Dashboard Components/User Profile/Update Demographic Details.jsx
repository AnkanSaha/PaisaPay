import React from 'react'; // Import React
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector from react-redux
import { API } from '@helper/Common'; // Import Crypto from Common.jsx
import moment from 'moment'; // Import moment
import { SlEnergy } from 'react-icons/sl'; // Import SlEnergy Icon
import { useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { updateAccountDetails } from '@redux/Slices/Account Slice'; // Import Account Slice

// import UI from Chakra UI
import { Heading, InputGroup, Input, Button, InputRightElement, useToast } from '@chakra-ui/react'; // Import Components

export default function UpdateDemographicInfo() {
	// hooks
	const ReduxState = useSelector(state => state); // Get Redux State
	const toast = useToast(); // Create Toast
	const navigate = useNavigate(); // Create Navigate
	const Dispatch = useDispatch(); // Create Dispatch

	// States
	const Decrypted_Account_Info = ReduxState.AccountInfo.AccountDetails;
	const [NewDemographicInfo, setNewDemographicInfo] = React.useState({
		NewEmail: Decrypted_Account_Info.Email,
		NewPhoneNumber: Decrypted_Account_Info.PhoneNumber,
		NewDOB: moment(Decrypted_Account_Info.DOB).format('YYYY-MM-DD'),
		Name: Decrypted_Account_Info.Name,
		ClientID: Decrypted_Account_Info.ClientID,
		OldEmail: Decrypted_Account_Info.Email,
		OldPhoneNumber: Decrypted_Account_Info.PhoneNumber,
		TPIN: null,
	}); // Set New Demographic Info
	const [loading, setLoading] = React.useState(false); // Set Loading State to false

	// Handler
	const HandleChanges = event => {
		setNewDemographicInfo({
			...NewDemographicInfo,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async () => {
		// Checks
		if (
			NewDemographicInfo.NewDOB === '' ||
			NewDemographicInfo.NewDOB === null ||
			NewDemographicInfo.Name === '' ||
			NewDemographicInfo.Name === null ||
			NewDemographicInfo.NewEmail === '' ||
			NewDemographicInfo.NewEmail === null ||
			NewDemographicInfo.NewPhoneNumber === '' ||
			NewDemographicInfo.NewPhoneNumber === null ||
			NewDemographicInfo.TPIN === '' ||
			NewDemographicInfo.TPIN === null
		) {
			toast({
				title: 'Error',
				description: 'Please Fill All Fields',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return; // Return if any field is empty
		}
		setLoading(true); // Set Loading to true
		const Encrypted_Info = NewDemographicInfo; // Encrypt New Demographic Info

		// Send Request
		const Response = await API.Put('/put/update/update-Demographic-Info', {
			Encrypted_Info,
			sessionID: ReduxState.AccountInfo.sessionID,
		});
		setLoading(false); // Set Loading to false
		if (Response.statusCode === 200) {
			toast({
				title: Response.Title,
				description: Response.message,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			Dispatch(updateAccountDetails(Response.data)); // Update Account Details
			navigate('/dashboard'); // Navigate to dashboard
		} else {
			toast({
				title: Response.Title,
				description: Response.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<div className="my-5">
			<>
				<div className="w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="flex flex-col items-center space-y-6 py-5">
						<Heading size="md">Change Demographic Details</Heading>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								onChange={HandleChanges}
								type="text"
								placeholder="Enter Name of Account holder"
								name="Name"
								value={NewDemographicInfo.Name}
							/>
							<InputRightElement width="4.5rem" />
						</InputGroup>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type="email"
								onChange={HandleChanges}
								placeholder="Enter Email address"
								name="NewEmail"
								value={NewDemographicInfo.NewEmail}
							/>
							<InputRightElement width="4.5rem" />
						</InputGroup>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type="number"
								onChange={HandleChanges}
								placeholder="Enter Phone Number"
								name="NewPhoneNumber"
								value={NewDemographicInfo.NewPhoneNumber}
							/>
							<InputRightElement width="4.5rem" />
						</InputGroup>
						<InputGroup size="md">
							<Input pr="4.5rem" type="date" onChange={HandleChanges} placeholder="Enter Date of birth" name="NewDOB" value={NewDemographicInfo.NewDOB} />
							<InputRightElement width="4.5rem" />
						</InputGroup>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								type="number"
								onChange={HandleChanges}
								placeholder="Enter Your TPIN to Confirm"
								name="TPIN"
								value={NewDemographicInfo.TPIN}
							/>
							<InputRightElement width="4.5rem" />
						</InputGroup>
					</div>
					<Button
						onClick={handleSubmit}
						isLoading={loading}
						className="w-full mb-5"
						colorScheme="facebook"
						leftIcon={<SlEnergy />}
						rightIcon={<SlEnergy />}
					>
						Update Demographic Details
					</Button>
				</div>
			</>
		</div>
	);
}
