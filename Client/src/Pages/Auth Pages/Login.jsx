import React from 'react'; // Importing react
import { Update_Document_Title } from '@helper/Common'; // ← Common functions

// Import Components here
import LoginForm from '@component/Auth Components/Login Components/LoginForm'; // ← Login Form Component
import GeneralFooter from '@component/Footer/General Footer'; // ← Footer Component

export default function LoginPage() {
	Update_Document_Title("Login"); // ← changing the title of document (page)
	return (
		<>
			<LoginForm />
			<GeneralFooter />
		</>
	);
}
