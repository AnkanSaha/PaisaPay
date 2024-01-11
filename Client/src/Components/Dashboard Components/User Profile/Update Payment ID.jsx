import React from 'react'; // Import React
import { API } from '@helper/Common'; // Common Helper Functions
import { useSelector, useDispatch } from 'react-redux'; // Import Use Selector From React Redux
import { FiAtSign } from 'react-icons/fi'; // Import FiAtSign Icon
import { useNavigate } from 'react-router-dom'; // Import Use Navigate From React Router Dom
import {updateAccountDetails} from '@redux/Slices/Account Slice'; //

// Import Components form Chakra UI
import { Heading, InputGroup, Input, InputRightElement, Button, useToast } from '@chakra-ui/react'; // import From Chakra UI

export default function UpdatePaymentID() {
	// Hooks
	const ReduxState = useSelector(state => state); // Get User Info From Redux State
	const toast = useToast(); // Create Toast
	const navigate = useNavigate(); // Create Navigate
	const Dispatch = useDispatch(); // Create Dispatch
	// Redux States
	const Decrypted_AccountDetails = ReduxState.AccountInfo.AccountDetails; // Decrypt Account Details

	// States
	const [show, setShow] = React.useState(false); // set the show state to false
	const [loading, setLoading] = React.useState(false); // set the loading state to false
	const [NewpaymentIDinfo, setNewpaymentIDinfo] = React.useState({
		NewPaymentID: '',
		TPIN: null,
		ClientID: Decrypted_AccountDetails.ClientID,
		PhoneNumber: Decrypted_AccountDetails.PhoneNumber,
		Email: Decrypted_AccountDetails.Email,
		PreviousPaymentID: Decrypted_AccountDetails.PaymentID,
	}); // set the New paymentIDinfo state to null

	// Functions
	const handleClick = () => setShow(!show); // set the show state to the opposite of what it is

	const handleChange = event => {
		setNewpaymentIDinfo({ ...NewpaymentIDinfo, [event.target.name]: event.target.value }); // set the New paymentIDinfo state to the value of the input field
	}; // set the New paymentIDinfo state to the value of the input field

	const handleUpdatePaymentID = async () => {
		// Checks
		if (
			NewpaymentIDinfo.NewPaymentID === '' ||
			NewpaymentIDinfo.TPIN === '' ||
			NewpaymentIDinfo.NewPaymentID === null ||
			NewpaymentIDinfo.TPIN === null
		) {
			toast({
				title: 'Error',
				description: 'Please Fill All Fields, New Payment ID and Current PIN',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		} else if (
			NewpaymentIDinfo.NewPaymentID.includes('@pp') ||
			NewpaymentIDinfo.NewPaymentID.includes('@PP') ||
			NewpaymentIDinfo.NewPaymentID.includes('@Pp') ||
			NewpaymentIDinfo.NewPaymentID.includes('@pP')
		) {
			toast({
				title: 'Error',
				description: 'Payment ID Cannot Include @pp or @PP',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		setLoading(true); // Update loading State to True
		const Encrypted_Info = NewpaymentIDinfo; // Encrypt All New Payment ID Info
		const Response = await API.Put('/put/update/update-PaymentID', {
			sessionID: ReduxState.AccountInfo.sessionID,
			Encrypted_Info: Encrypted_Info,
		});
		setLoading(false); // Update loading State to True
		if (Response.statusCode === 200) {
			toast({
				title: Response.Title,
				description: Response.message,
				status: 'success',
				duration: 5000,
				isClosable: true,
			}); // Create Toast
			Dispatch(updateAccountDetails(Response.data))
			navigate('/dashboard'); // Navigate to User Profile
		} else {
			toast({
				title: Response.Title,
				description: Response.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			}); // Create Toast
		}
	};
	return (
		<div className="my-5">
			<>
				<div className="w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="flex flex-col items-center space-y-6 py-5">
						<Heading size="lg">Change Payment ID </Heading>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								onChange={handleChange}
								value={NewpaymentIDinfo.NewPaymentID}
								type={show ? 'text' : 'password'}
								placeholder="Enter New Payment ID"
								name="NewPaymentID"></Input>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<InputGroup size="md">
							<Input
								pr="4.5rem"
								onChange={handleChange}
								value={NewpaymentIDinfo.TPIN}
								type={show ? 'text' : 'password'}
								placeholder="Enter Current PIN"
								name="TPIN"
							/>
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
					</div>
					<Button
						isLoading={loading}
						className="w-full mb-5"
						colorScheme="blue"
						onClick={handleUpdatePaymentID}
						leftIcon={<FiAtSign />}
						rightIcon={<FiAtSign />}>
						Update Payment ID
					</Button>
				</div>
			</>
		</div>
	);
}
