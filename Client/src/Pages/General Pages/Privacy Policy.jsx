import React from 'react' // Importing React

// Import Components
import GeneralNavbar from '@component/Navbar/General Navbar' // Importing General Navbar
import GeneralFooter from '@component/Footer/General Footer' // Importing General Footer

// Import Sections
import FirstSection from '@component/General Components/Privacy Policy Components/First Section' // Importing First Section
import SecondSection from '@component/General Components/Privacy Policy Components/Second Section' // Importing Second Section
import ThirdSection from '@component/General Components/Privacy Policy Components/Third Section' // Importing Third Section
import FourthSection from '@component/General Components/Privacy Policy Components/Fourth Section' // Importing Fourth Section

// Import Functions
import { Update_Document_Title } from '@helper/Common' // ← Common functions

function PrivacyPolicy () {
  Update_Document_Title('Privacy Policy') // Updating Document Title by Calling Function
  return (
    <>
      <GeneralNavbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <GeneralFooter FooterStyle='static' />
    </>
  )
}

export default PrivacyPolicy // Exporting Privacy Policy Page
