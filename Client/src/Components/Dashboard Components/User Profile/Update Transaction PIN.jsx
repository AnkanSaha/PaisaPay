import React from 'react'; // This is installed with react by default.

// Import Components from Chakra UI
import { Input, InputGroup, InputRightElement, Button, Heading, useToast } from '@chakra-ui/react'; // import the input component from chakra ui

//Import Icons
import { MdSystemSecurityUpdateGood } from 'react-icons/md'; // import the MdSystemSecurityUpdateGood icon from react-icons/md

// Import Redux
import { useSelector } from 'react-redux'; // import the hook from react-redux

// Import Helpers
import { API } from '@helper/Common'; // import the cryptography function

// Main Function based component
export default function UpdateTransactionPIN() {

    // Hooks
    const toast = useToast(); // set the toast variable to use the useToast hook

    // Encrypted Account Details from Redux
	const AccountDetails = useSelector(state => state.AccountInfo); // get the account details from the redux store

	// Decode All Account Details
	const Decoded_Account_Details = AccountDetails.AccountDetails; // decode the jwt token to get the account details
	
	// States
	const [show, setShow] = React.useState(false); // set the show state to false
    const [loading, setLoading] = React.useState(false); // set the loading state to false
    const [PinInfo, setPinInfo] = React.useState({
        CurrentPin: '',
        NewPin: '',
        ConfirmNewPin: '',
        ClientID: Decoded_Account_Details.ClientID,
        Email: Decoded_Account_Details.Email,
        PhoneNumber: Decoded_Account_Details.PhoneNumber,
    }); // set the pin info state to an empty object

	// Functions
	const handleClick = () => setShow(!show); // set the show state to the opposite of what it is
    const handleChange = event => {
        setPinInfo({
            ...PinInfo,
            [event.target.name]: event.target.value
        })
    } // set the pin info state to the value of the input

    // Update Transaction PIN Function
    const UpdateTransactionPIN = async () => {
        if(PinInfo.CurrentPin === '' || PinInfo.NewPin === '' || PinInfo.ConfirmNewPin === ''){
            toast({
                title: "Error",
                description: "Please fill in all fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return;
        }else if(PinInfo.NewPin !== PinInfo.ConfirmNewPin){
            toast({
                title: "Error",
                description: "New PIN and Confirm New PIN do not match",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        else if(!(PinInfo.NewPin.length >= 4) || !(PinInfo.ConfirmNewPin.length >= 4)){
            toast({
                title: "Error",
                description: "New PIN and Confirm New PIN must be greater than 4 digits",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        setLoading(true); // set the loading state to true

        // Encrypt the pin info object for security reasons
        const Encrypted_Pin_Info = PinInfo; // encrypt the pin info object

        // Send the request to the server to update the transaction pin
        const Response = await API.Put('/put/update/transaction-pin', {
            sessionID: AccountDetails.sessionID,
            EncryptedData: Encrypted_Pin_Info,
        }); // send the request to the server to update the transaction pin using PUT method
        setLoading(false); // set the loading state to false

        if(Response.statusCode === 200 || Response.status === true){
            toast({
                title: Response.Title,
                description: Response.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            setPinInfo({
                CurrentPin: '',
                NewPin: '',
                ConfirmNewPin: '',
                ClientID: Decoded_Account_Details.ClientID,
                Email: Decoded_Account_Details.Email,
                PhoneNumber: Decoded_Account_Details.PhoneNumber,
            })
            return;
        }

        toast({
            title: Response.Title,
            description: Response.message,
            status: "error",
            duration: 5000,
            isClosable: true
        }); // display the error message
    }
    
	return (
		<div className="my-5">
			<>
				<div className="w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="flex flex-col items-center space-y-6 py-5">
						<Heading size="lg">Change Transaction PIN</Heading>
						<InputGroup size="md">
							<Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter Current PIN" value={PinInfo.CurrentPin} name='CurrentPin' onChange={handleChange} />
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<InputGroup size="md">
							<Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter New PIN" value={PinInfo.NewPin} name='NewPin' onChange={handleChange} />
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
						<InputGroup size="md">
							<Input pr="4.5rem" type={show ? 'text' : 'password'} placeholder="Enter New PIN Again" value={PinInfo.ConfirmNewPin} name='ConfirmNewPin' onChange={handleChange} />
							<InputRightElement width="4.5rem">
								<Button h="1.75rem" size="sm" onClick={handleClick}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>
					</div>
					<Button isLoading={loading} onClick={UpdateTransactionPIN} className="w-full mb-5" colorScheme="facebook" leftIcon={<MdSystemSecurityUpdateGood />} rightIcon={<MdSystemSecurityUpdateGood />}>
						Update PIN
					</Button>
				</div>
			</>
		</div>
	);
}
