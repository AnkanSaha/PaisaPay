/* eslint-disable react/display-name */
import React from 'react';
import { Input, Textarea, Button, FormControl, FormLabel, VStack, Box, useToast, Heading } from '@chakra-ui/react';

import { API } from '@helper/Common'; // Import JWT Features
import { useNavigate } from 'react-router-dom';
// Import Redux Features
import { useSelector } from 'react-redux'; // Import useSelector() Hook

// Import Functions
import HelpCenterDataValidator from '@validator/General/Help Center'; // Import Help Center Data Validator
const ContactForm = () => {
	const navigate = useNavigate(); // Navigate to Other Pages
	const toast = useToast(); // Toast UI

	// Temp State For This Form
	const [PreTopic] = React.useState([
		'Request for a new feature',
		'Report a bug',
		'Request for Account Deletion',
		'Request for Account Recovery',
		'Payment Related Issues',
		'Balance Deducted but not added to account',
		'Other',
	]); // Set Topic
	const [formData, setFormData] = React.useState({
		ClientID: '',
		TicketTitle: '',
		TicketDescription: '',
		CurrentClientDetails: '',
		sessionID: '',
	}); // Set Form Data

	// redux state
	const EncryptedUserDetails = useSelector(state => state.AccountInfo); // Get Encrypted User Details from Redux Store
	const GeneralInformation = useSelector(state => state.GeneralAppInfo); // Get General Information from Redux Store

	React.useEffect(() => {
		if (EncryptedUserDetails !== null) {
			const decodedAccountDetails = EncryptedUserDetails.AccountDetails; // Decode User Details

			// Update Form Data
			setFormData(prevFormData => ({
				...prevFormData,
				ClientID: decodedAccountDetails.ClientID,
				CurrentClientDetails: GeneralInformation.ClientDetails,
				sessionID: EncryptedUserDetails.sessionID,
			}));
		} else {
			navigate('/auth/login'); // Navigate to Login Page
		}
	}, [EncryptedUserDetails]); // Run this effect whenever EncryptedUserDetails changes

	// Handle Form Data
	const InputHandler = e => {
		const { name, value } = e.target; // Get Input Name & Value
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value,
		})); // Update Form Data
	};

	// Handler Form Submit
	const HandleSubmit = async e => {
		e.preventDefault(); // Prevent Default Form Submission
		const ValidateResult = await HelpCenterDataValidator(formData); // Validate Form Data

		if (ValidateResult.status === true) {
			const ServerResult = await API.Post('/post/help-center/create-new-ticket', formData); // Send Help Center Request
			if (ServerResult.status === true) {
				toast({
					title: ServerResult.Title,
					description: ServerResult.message,
					status: 'success',
					duration: 9000,
					isClosable: true,
				});
				navigate('/'); // Navigate to Dashboard
			} else {
				toast({
					title: ServerResult.Title,
					description: ServerResult.message,
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
			}
		} else {
			toast({
				title: ValidateResult.Title,
				description: ValidateResult.Description,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Box textAlign="center" py={8}>
				<Heading as="h1" fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="bold" color="teal.500">
					This is Client Only Service
				</Heading>
			</Box>
			<form className="max-w-md mx-auto mt-2 p-4 md:p-8 bg-cyan-50 shadow-md rounded-lg lg:mb-10 mb-[12.5rem]">
				<VStack spacing={4}>
					<FormControl id="ClientID">
						<FormLabel>Client ID *</FormLabel>
						<Input type="number" disabled name="ClientID" onChange={InputHandler} value={formData.ClientID} placeholder="Enter Client ID" />
					</FormControl>

					<FormControl id="TicketTitle">
						<FormLabel>Topic *</FormLabel>
						<select name="TicketTitle" className="select select-bordered w-full min-w-full max-w-xs" onChange={InputHandler} value={formData.TicketTitle}>
							<option selected>Select Your Topic</option>
							{PreTopic.map((topic, index) => {
								return (
									<option value={topic} key={index}>
										{topic}
									</option>
								);
							})}
						</select>
					</FormControl>

					<FormControl id="TicketDescription">
						<FormLabel>Message *</FormLabel>
						<Textarea rows={4} placeholder="Enter Message" name="TicketDescription" onChange={InputHandler} value={formData.TicketDescription} />
					</FormControl>

					<Button colorScheme="teal" size="md" type="submit" _hover={{ bgColor: 'teal.500' }} _active={{ bgColor: 'teal.600' }} onClick={HandleSubmit}>
						Send Request
					</Button>
				</VStack>
			</form>
		</>
	);
};

export default ContactForm;
