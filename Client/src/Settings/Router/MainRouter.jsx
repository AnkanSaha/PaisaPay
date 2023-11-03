import React from 'react'; // import React module
// Desc: Router for the application
import { Routes, Route } from 'react-router-dom'; // import the React router DOM module

// import All Pages
import HomePage from '@page/General Pages/Home'; // import the home page
import AboutUsPage from '@page/General Pages/About Us'; // import the about us page
import PrivacyPolicy from '@page/General Pages/Privacy Policy'; // import the privacy policy page
import HelpCenter from '@page/General Pages/Help Center'; // import the help center page
import RefundPolicy from '@page/General Pages/Refund Policy'; // import the refund policy page

// Import Error Handler
import DashboardErrorHandler from '../Error Handlers/Dashboard Error Handler'; // import the dashboard error handler
import AuthErrorHandler from '../Error Handlers/Auth Error Handlers'; // import the auth error handler

// No Page Found Component
import PageNotFound from '@page/Common Pages/Page Not Found'; // import the not logged in and offline page for No Page Found error

// Router Function
export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/about/" element={<AboutUsPage />} />
			<Route path="/privacy/" element={<PrivacyPolicy />} />
			<Route path="/refund-Policy" element={<RefundPolicy />} />
			<Route path="/help/" element={<HelpCenter />} />
			<Route path="/dashboard/*" element={<DashboardErrorHandler />} />
			<Route path="/auth/*" element={<AuthErrorHandler />} />
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
	);
} // export the router
