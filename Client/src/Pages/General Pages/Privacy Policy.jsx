import React from 'react'; // Importing React

// Import Components
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // Importing General Navbar
import GeneralFooter from '../../Component/Footer/General Footer'; // Importing General Footer

// Import Sections
import FirstSection from '../../Component/General Components/Privacy Policy Components/First Section'; // Importing First Section
import SecondSection from '../../Component/General Components/Privacy Policy Components/Second Section'; // Importing Second Section
import ThirdSection from '../../Component/General Components/Privacy Policy Components/Third Section'; // Importing Third Section
import FourthSection from '../../Component/General Components/Privacy Policy Components/Fourth Section'; // Importing Fourth Section

// Import Functions
import {Update_Document_Title} from '../../Helper/Common'; // ← Common functions

function PrivacyPolicy() {
  Update_Document_Title('Privacy Policy'); // Updating Document Title by Calling Function
  return (
    <>
      <GeneralNavbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <GeneralFooter FooterStyle="static"/>
    </>
  )
}

export default PrivacyPolicy; // Exporting Privacy Policy Page
