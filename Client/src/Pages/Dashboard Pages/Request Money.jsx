import React from 'react'; // Import React

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // import the navbar component
import ReceivedRequestTable from '@component/Dashboard Components/Request Money/Received Request table'; // import the received request table component
import CreateNewMoneyRequest from '@component/Dashboard Components/Request Money/Create New Money Request'; // import the create new money request component

// Import Factions
import { Update_Document_Title } from '@helper/Common'; // import the common functions

export default function RequestMoney() {
	// Update Document Title
	Update_Document_Title('Request Money'); // update the document title

	document.addEventListener('contextmenu', event => event.preventDefault()); // disable the context menu'

	window.addEventListener('beforeunload', event => {
		// Custom confirmation message
		const confirmationMessage = 'You will be logged out of the system.';

		// Most browsers require returning the confirmation message to display it
		event.returnValue = confirmationMessage;

		// Some browsers don't display the custom message but still need a return value
		return confirmationMessage;
	});

	return (
		<div>
			<Navbar />
			<CreateNewMoneyRequest />
			<ReceivedRequestTable />
		</div>
	);
}
