import React from 'react'; // Importing React

// Importing Components
import GeneralFooter from '@component/Footer/General Footer'; // Importing General Footer
import GeneralNavbar from '@component/Navbar/General Navbar'; // Importing General Header
import ForgetPasswordFinder from '@component/Auth Components/Forget Password Components/Forget Password Finder';

// Import Functions
import { Update_Document_Title } from '@helper/Common'; // ← Common functions

export default function ForgetPassword() {
	Update_Document_Title('Forget Password | Section 1');
	return (
		<>
			<GeneralNavbar />
			<ForgetPasswordFinder />
			<GeneralFooter />
		</>
	);
}
