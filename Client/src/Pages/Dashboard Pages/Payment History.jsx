// import Required Modules
import React from 'react'; // import React

// Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // import the general navbar component
import PaymentHistoryS from '@component/Dashboard Components/Payment History/Show Payment History';

// import Functions
import { Update_Document_Title } from '@helper/Common'; // import the function to update the document title

// Main Function
export default function PaymentHistory() {
	// Update Document Title
	Update_Document_Title('Payment History'); // update the document title

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
			<Navbar />
			<PaymentHistoryS />
		</>
	);
}
