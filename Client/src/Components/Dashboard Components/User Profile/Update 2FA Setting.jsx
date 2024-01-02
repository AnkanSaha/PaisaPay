import React from 'react'; // Import React
import { API, Cryptography } from '@helper/Common'; // Common Helper Functions
import { useSelector, useDispatch } from 'react-redux'; // Import Use Selector From React Redux
import { MdOutlineSecurity } from 'react-icons/md'; // Import MdOutlineSecurity Icon
import { useNavigate } from 'react-router-dom'; // Import Use Navigate From React Router Dom
import { updateAccountDetails } from '@redux/Slices/Account Slice'; //

// Import Components form Chakra UI
import { Heading, Button, useToast } from '@chakra-ui/react'; // import From Chakra UI

export default function Update2FASetting() {
	// Hooks
	const ReduxState = useSelector(state => state); // Get User Info From Redux State
	const toast = useToast(); // Create Toast
	const navigate = useNavigate(); // Create Navigate
	const Dispatch = useDispatch(); // Create Dispatch
	// Redux States
	const Decrypted_AccountDetails = JSON.parse(Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)); // Decrypt Account Details
	console.log(Decrypted_AccountDetails);
	// States
	const [show, setShow] = React.useState(false); // set the show state to false
	const [loading, setLoading] = React.useState(false); // set the loading state to false

	// Functions
	const OpenUp2FAService = async () => {
		// Check if WebAuthn is supported
		if (!navigator.credentials || !navigator.credentials.create) {
			alert('WebAuthn is not supported in this browser.');
			return;
		}
		setLoading(true); // set the loading state to true
		await SetupPasskey();
		setLoading(false); // set the loading state to false
	};

	const SetupPasskey = async () => {
		try {
			// Encrypt Account Details
			const Encrypted_Payment_Info = await Cryptography.Encrypt({
				ClientID: Decrypted_AccountDetails.ClientID,
				Email: Decrypted_AccountDetails.Email,
				Name: Decrypted_AccountDetails.Name,
				PhoneNumber: Decrypted_AccountDetails.PhoneNumber,
				PaymentID: Decrypted_AccountDetails.PaymentID,
			})
			// Get Challenge from server
			const Challenge = await API.Post('/Post/Multifactor/Passkey/GenerateChallenge', {
				sessionID: ReduxState.AccountInfo.sessionID,
				Encrypted_Info: Encrypted_Payment_Info
			});
			console.log(Challenge);
			// setup Config
			const Config = {
				publicKey: {
					challenge: new TextEncoder().encode(atob(Challenge.data.Challenge)),
					rp: {
						name: 'PaisaPay',
					},
					user: {
						id: Decrypted_AccountDetails.ClientID,
						name: Decrypted_AccountDetails.Name,
						displayName: Decrypted_AccountDetails.Name,
						Email: Decrypted_AccountDetails.Email,
					},
					pubKeyCredParams: [
						{
							type: 'public-key',
							alg: -7,
						} // "ES256" IANA COSE Algorithms registry
					],
					timeout: 60000, // Timeout in milliseconds (e.g., 60 seconds)
					authenticatorSelection: {
						authenticatorAttachment: 'cross-platform', // or "platform"
						userVerification: 'preferred', // or "required" or "discouraged"
					},
				},
			};
			console.log(Config)
			// Generate a new credential pair
			const Generated_User_PassKey = await navigator.credentials.create(Config);
			console.log(Generated_User_PassKey);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="my-5 mb-[5rem]">
			<>
				<div className="w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div className="flex flex-col items-center space-y-6 py-5">
						<Heading size="lg">Secure Your Account </Heading>
					</div>
					<Button
						isLoading={loading}
						className="w-full mb-5"
						colorScheme={Decrypted_AccountDetails.isTWO_Factor_Authentication_Activated === true ? 'red' : 'green'}
						onClick={OpenUp2FAService}
						leftIcon={<MdOutlineSecurity />}
						rightIcon={<MdOutlineSecurity />}>
						{Decrypted_AccountDetails.isTWO_Factor_Authentication_Activated === true ? 'Disable Passkey / Security Key' : 'Setup Passkey / Security Key'}
					</Button>
				</div>
			</>
		</div>
	);
}
