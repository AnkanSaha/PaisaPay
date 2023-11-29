import React from 'react'; // Import React
import { useSelector } from 'react-redux'; // import useSelector from react-redux
// import Moment from 'moment'; // import moment for date formatting
import { Cryptography, API as Service } from '@helper/Common'; // import the Crypto function from the Common file


// import Components
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button, useToast } from '@chakra-ui/react'; // import the chakra ui table components
import { LoadingScreen } from '@page/Common Pages/Loading Screen'; // import the loading screen component

// import icons
import { PiContactlessPaymentLight } from 'react-icons/pi'; // import the payment icon

export default function ReceivedRequestTable() {
	//States
	const [isLoading, setIsLoading] = React.useState(false); // Loading Screen State

	// Hooks
	const toast = useToast(); // use toast for the toast notification

    // Redux Store
	const ReduxState = useSelector(state => state); // get the account details from the redux store

	// Decode All Account Details
	const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)); // decode the jwt token to get the account details
    console.log(Decoded_Account_Details);
	return (
		<>
			{isLoading === true ? (
				<LoadingScreen StatusText=" Loading All Payment Request Report" />
			) : (
				<>
					<TableContainer className="mx-10 mt-16">
						<Table variant="simple">
							<TableCaption> All the received requests will be displayed here. </TableCaption>
							<Thead>
								<Tr>
									<Th>Requester Name</Th>
									<Th>Requester Payment ID</Th>
									<Th> Phone Number </Th>
									<Th>Requested Date & Time</Th>
									<Th> Amount </Th>
									<Th> Request Status </Th>
									<Th> Take Payment Action </Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>John Doe</Td>
									<Td>PaisaPay@pp</Td>
									<Td> +91 1234567890 </Td>
									<Td> 12/12/2021 12:12 AM </Td>
									<Td> $100 </Td>
									<Td> Pending </Td>
									<Td>
										{' '}
										<Button leftIcon={<PiContactlessPaymentLight />} rightIcon={<PiContactlessPaymentLight />} colorScheme="green" variant="solid">
											{' '}
											Settings
										</Button>{' '}
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	); // End of return statement
} // End of ReceivedRequestTable()
