import React from 'react' // Import react

// Import Components
import Navbar from '@component/Navbar/Dashboard Navbar' // Import Dashboard Navbar
import WithdrawalForm from '@component/Dashboard Components/Withdrawal/Withdrawal Form' // Import Withdrawal Form

// Import Factions
import { Update_Document_Title } from '@helper/Common' // import the common functions

export default function Withdrawal () {
  // Update Document Title
  Update_Document_Title('Withdrawal') // update the document title

  document.addEventListener('contextmenu', event => event.preventDefault()) // disable the context menu'

  window.addEventListener('beforeunload', function (e) {
    // Custom confirmation message
    const confirmationMessage = 'You will be logged out of the system.'

    // Most browsers require returning the confirmation message to display it
    e.returnValue = confirmationMessage

    // Some browsers don't display the custom message but still need a return value
    return confirmationMessage
  })
  return (
    <div>
      <Navbar />
      <WithdrawalForm />
    </div>
  )
}
