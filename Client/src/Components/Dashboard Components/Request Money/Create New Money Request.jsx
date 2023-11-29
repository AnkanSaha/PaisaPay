import React from 'react'; // Import React
import { useSelector } from 'react-redux'; // import useSelector from react-redux
import { Cryptography } from '@helper/Common'; // import the Crypto function from the Common file

// Import Components
import {
	Button,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
    // useToast
} from '@chakra-ui/react'; // import the chakra ui table components

// Import Icons
import { IoIosCreate } from 'react-icons/io'; // import the create icon

export default function CreateNewMoneyRequest() {
	// States
	const { isOpen, onOpen, onClose } = useDisclosure(); // use the useDisclosure hook for the modal
    const [CreateButtonLoading, setCreateButtonLoading] = React.useState(false); // Create Button Loading State

    // Hooks 
    // const toast = useToast(); // use toast for the toast notification
    const ReduxState = useSelector(state => state); // get the account details from the redux store

    // Decode All Account Details
	const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)); // decode the jwt token to get the account details
    console.log(Decoded_Account_Details);

	// Functions
	const OpenModal = () => {
        setCreateButtonLoading(true);
		onOpen();
	};

    const CloseModal = () => {
        setCreateButtonLoading(false);
        onClose();
    }
	return (
		<>
			<Button
				colorScheme="facebook"
				onClick={OpenModal}
				leftIcon={<IoIosCreate />}
				rightIcon={<IoIosCreate />}
				variant="solid"
				className="right-[6%]"
                isLoading={CreateButtonLoading}
				position="absolute">
				Create New Request
			</Button>
			<Modal isOpen={isOpen} onClose={CloseModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create New Request</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl isRequired>
							<FormLabel>Payment ID</FormLabel>
							<Input placeholder="Enter the payment ID of the person you want to request money from" />
						</FormControl>

						<FormControl isRequired mt={4}>
							<FormLabel>Amount</FormLabel>
							<Input placeholder="Enter the amount you want to request" />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Request Money
						</Button>
						<Button onClick={CloseModal}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
} // export the function
