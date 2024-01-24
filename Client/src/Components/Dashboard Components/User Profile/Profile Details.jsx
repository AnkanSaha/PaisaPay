import React from 'react'; // import react
import { useSelector } from 'react-redux'; // import react-redux
import { API } from '@helper/Common'; // import the crypto function
import moment from 'moment'; // import moment
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom

// Import Redux
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { updateAccountDetails } from '@redux/Slices/Account Slice'; // Import the account slice

// Import Components
import { Box, Heading, Stack, StackDivider, Text, Card, CardHeader, CardBody, Button, Input, useToast } from '@chakra-ui/react'; // import chakra ui components

// Import icons
import { WiCloudDown, WiCloudRefresh } from 'react-icons/wi'; // import the cloud down icon

export default function ProfileDetails() {
	// Hooks
	const ReduxState = useSelector(state => state); // get redux state
	const Toast = useToast(); // get the toast function
	const Dispatch = useDispatch(); // get the dispatch function
	const Navigate = useNavigate(); // get the navigate function

	// States
	const Decrypted_Data = ReduxState.AccountInfo.AccountDetails; // decrypt the data

	const [loading, setLoading] = React.useState(false); // loading state for the button
	const [TPIN, setTPIN] = React.useState(''); // transaction pin state

	// Functions
	const handleTPIN = e => {
		setTPIN(e.target.value); // set the transaction pin
	}; // handle the transaction pin

	const AccountClosure = async () => {
		// Check if TPIN is empty
		if (TPIN === '') {
			Toast({
				title: 'Error',
				description: 'Please enter your transaction PIN to proceed',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		setLoading(true); // set loading to true
		const Response = await API.Delete(
			`/delete/Account/activate-deactivate-account?ClientID=${Decrypted_Data.ClientID}&AccountStatus=${
				Decrypted_Data.AccountStatus === 'Active' ? 'Disabled' : 'Active'
			}&sessionID=${ReduxState.AccountInfo.sessionID}&TPIN=${TPIN}`
		);
		setLoading(false); // set loading to false
		Dispatch(updateAccountDetails(Response.data)); // update the account details
		if (Response.statusCode === 200) {
			Toast({
				title: Response.Title,
				description: Response.message,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			Navigate('/dashboard'); // navigate to dashboard
		} else {
			Toast({
				title: Response.Title,
				description: Response.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<div className="absolute right-[3rem] w-[62%] top-[7rem] pb-20">
				<Card>
					<CardHeader>
						<Heading className="text-center" size="lg">
							Client Details
						</Heading>
					</CardHeader>

					<CardBody>
						<Stack divider={<StackDivider />} spacing="4">
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Number
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.ClientID}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Balance
								</Heading>
								<Text pt="2" fontSize="sm">
									₹ {Decrypted_Data.Balance} INR
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Payment ID
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.PaymentID.toUpperCase()} (Unique)
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Creation Date
								</Heading>
								<Text pt="2" fontSize="sm">
									{moment(Decrypted_Data.DateCreated).format('DD/MM/YYYY HH:mm:ss A')}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Holder Name
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.Name}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Type
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.AccountType}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Account Status
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.AccountStatus}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Date of Birth
								</Heading>
								<Text pt="2" fontSize="sm">
									{moment(Decrypted_Data.DOB).format('DD/MM/YYYY')}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Email Address (Primary)
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.Email}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Phone Number (Primary)
								</Heading>
								<Text pt="2" fontSize="sm">
									+91 {Decrypted_Data.PhoneNumber}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									National ID Type
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.National_ID_Type}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Profile Pic File name in server
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.ProfilePicFileName}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Four Digit of National ID Number
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastFourDigitsOfIDNumber}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login IP Address
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginIP} ({Decrypted_Data.LastLoginClientDetails.IP_Type})
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Location
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.Client_Location.region} (
									{Decrypted_Data.LastLoginClientDetails.Client_Location.country === 'IN'
										? 'India'
										: Decrypted_Data.LastLoginClientDetails.Client_Location.country}
									)
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Latitude & Longitude
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.Client_Location.loc.split(',', 2)[0]} (Latitude) /{' '}
									{Decrypted_Data.LastLoginClientDetails.Client_Location.loc.split(',', 2)[1]} (Longitude)
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Network Provider
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.Client_Location.org}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Timezone
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.Client_Location.timezone}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Time
								</Heading>
								<Text pt="2" fontSize="sm">
									{moment(Decrypted_Data.LastLoginTime).format('DD/MM/YYYY HH:mm:ss A')}
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Browser Name
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.BrowserDetails.BrowserName} (v
									{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.BrowserDetails.BrowserVersion})
								</Text>
							</Box>
							<Box>
								<Heading size="xs" textTransform="uppercase">
									Last Login Device
								</Heading>
								<Text pt="2" fontSize="sm">
									{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DeviceType} (
									{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DevicePlatform} /{' '}
									{Decrypted_Data.LastLoginClientDetails.ClientDeviceDetails.Device_Details.DeviceCPU} Core)
								</Text>
							</Box>
						</Stack>
					</CardBody>
					<Box className="text-center px-10">
						<Heading size="xs" textTransform="uppercase">
							Account {Decrypted_Data.AccountStatus === 'Active' ? 'Deactivation' : 'Activation'} Controls
						</Heading>
						<Input type="number" placeholder="Enter Transaction PIN to confirm" className="mt-5" value={TPIN} onChange={handleTPIN} />
						<Button
							onClick={AccountClosure}
							isLoading={loading}
							colorScheme={Decrypted_Data.AccountStatus === 'Active' ? 'red' : 'green'}
							className="mt-5"
							leftIcon={Decrypted_Data.AccountStatus === 'Active' ? <WiCloudDown /> : <WiCloudRefresh />}
							rightIcon={Decrypted_Data.AccountStatus === 'Active' ? <WiCloudDown /> : <WiCloudRefresh />}
						>
							{Decrypted_Data.AccountStatus === 'Active' ? 'Deactivate Account' : 'Activate Account'}
						</Button>
					</Box>
				</Card>
			</div>
		</>
	);
}
