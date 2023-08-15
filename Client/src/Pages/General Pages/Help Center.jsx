import React from 'react'; // import React module

// Import Components
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // import General Navbar
import ContactForm from '../../Component/General Components/Help Center Components/Contact Form'; // import Contact Form
import GeneralFooter from '../../Component/Footer/General Footer'; // import General Footer

export default function HelpCenter() {
  return (
    <div>
      <GeneralNavbar />
      <ContactForm />
      <GeneralFooter FooterStyle='fixed' />
    </div>
  )
}
