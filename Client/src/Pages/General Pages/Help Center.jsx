import React from 'react' // import React module

// Import Components
import GeneralNavbar from '@component/Navbar/General Navbar' // import General Navbar
import ContactForm from '@component/General Components/Help Center Components/Contact Form' // import Contact Form
import GeneralFooter from '@component/Footer/General Footer' // import General Footer

// Import Functions
import { Update_Document_Title } from '@helper/Common' // import function

export default function HelpCenter () {
  Update_Document_Title('Help Center') // Update Document Title by calling function from Helper Functions
  return (
    <div>
      <GeneralNavbar />
      <ContactForm />
      <GeneralFooter FooterStyle='fixed' />
    </div>
  )
}
