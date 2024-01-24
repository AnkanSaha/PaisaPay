import React from 'react';

// Import Functions
import { Update_Document_Title } from '@helper/Common'; // import the function to update the document title

// Import Components for this page
import GeneralNavbar from '@component/Navbar/General Navbar'; // General Navbar
import GeneralFooter from '@component/Footer/General Footer'; // General Footer
import AboutTopSection from '@component/General Components/About Us Components/Top Section'; // About Us Top Section
import Accordions from '@component/General Components/About Us Components/Accordion'; // About Us Accordion

export default function AboutUsPage() {
	Update_Document_Title("About Us"); // update the document title
	return (
		<>
			<GeneralNavbar Text="Dashboard" Link="/dashboard" />
			<AboutTopSection />
			<Accordions />
			<GeneralFooter FooterStyle="static" />
		</>
	);
}
