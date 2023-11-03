// import Required Modules
import React from 'react'; // import React
import { Cryptography } from '@helper/Common'; // import the cryptography function

// Redux
import { useSelector } from 'react-redux'; // import useSelector from react-redux

// import Components
import DashboardNavbar from '@component/Navbar/Dashboard Navbar'; // import the general navbar

// import Functions
import { Update_Document_Title } from '@helper/Common'; // import the function to update the document title

// Import Components
import BalanceShow from '@component/Dashboard Components/overview/Balance Show'; // import the balance show component
import SendMoneySection from '@component/Dashboard Components/overview/Send Money Section'; // import the send money section component

// main component
export default function Dashboard() {
	// Redux
	// Encrypted Account Details from Redux
	const AccountDetails = useSelector(state => state.AccountInfo); // get the account details from the redux store
	// Decode All Account Details
	const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(AccountDetails.AccountDetails)); // decode the jwt token to get the account details

	Update_Document_Title(Decoded_Account_Details.Name); // update the document title
	document.addEventListener('contextmenu', event => event.preventDefault()); // disable the context menu'

	window.addEventListener('beforeunload', function (e) {
		// Custom confirmation message
		const confirmationMessage = 'You will be logged out of the system.';

		// Most browsers require returning the confirmation message to display it
		e.returnValue = confirmationMessage;

		// Some browsers don't display the custom message but still need a return value
		return confirmationMessage;
	});
	return (
		<>
			<DashboardNavbar />
			<BalanceShow />
			<SendMoneySection />
		</>
	);
} // end of main component
