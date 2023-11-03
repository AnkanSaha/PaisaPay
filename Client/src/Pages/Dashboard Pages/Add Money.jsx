import React from 'react'; // import react

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar'; // import the navbar component
import Header from '@component/Dashboard Components/Add Money/Header'; // import the header component
import ShowPayButton from '@component/Dashboard Components/Add Money/ShowPayButton'; // import the show pay button component

// import Functions
import { Update_Document_Title } from '@helper/Common'; // import the function to update the document title

export default function AddMoney() {
	Update_Document_Title('Add Money'); // update the document title
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
			<Header />
			<ShowPayButton />
		</>
	);
} // export the add money page
