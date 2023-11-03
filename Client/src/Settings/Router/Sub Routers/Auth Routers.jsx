import React from 'react'; // import react
import { Routes, Route } from 'react-router-dom'; // import the routes component from react-router-dom

// No Page Found Component
import PageNotFound from '@page/Common Pages/Page Not Found'; // import the not logged in and offline page for No Page Found error

// import Components & Pages
import SignupPage from '@page/Auth Pages/Signup'; // import the signup page
import LoginPage from '@page/Auth Pages/Login'; // import the login page
import ForgetPasswordFinder from '@page/Auth Pages/Forget Password/Forget Password Finder'; // import the forget password finder page
import ForgetPasswordValidator from '@page/Auth Pages/Forget Password/Forget Password validator'; // import the forget password finder page
import ResetPasswordPage from '@page/Auth Pages/Forget Password/Reset Password'; // import the reset password page

export default function AuthRouter() {
	return (
		<Routes>
			<Route path="/create-account" element={<SignupPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/forget-password" element={<ForgetPasswordFinder />} />
			<Route path="/forget-password/Verify" element={<ForgetPasswordValidator />} />
			<Route path="/reset-password/Update" element={<ResetPasswordPage />} />
			<Route
				path="*"
				element={
					<PageNotFound
						Status="No Page Found"
						Message="Seems like the page you are looking for is not available. Please check the URL and try again."
						ButtonText="Go Home"
						ButtonLink="/"
					/>
				}
			/>
		</Routes>
	); // return the dashboard router
} // export the dashboard router
