import React from 'react'

// Import Functions
import { Update_Document_Title } from "../../Helper/Common"; // import the function to update the document title

// Import Components for this page
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // General Navbar
import GeneralFooter from '../../Component/Footer/General Footer'; // General Footer
import AboutTopSection from '../../Component/General Components/About Us Components/Top Section'; // About Us Top Section
import Accordions from '../../Component/General Components/About Us Components/Accordion'; // About Us Accordion

export default function AboutUsPage() {
  Update_Document_Title(`About Us`); // update the document title
  return (
    <>
    <GeneralNavbar Text="Dashboard" Link="/dashboard" />
    <AboutTopSection />
    <Accordions />
      <GeneralFooter FooterStyle="static" />
    </>
  )
}
