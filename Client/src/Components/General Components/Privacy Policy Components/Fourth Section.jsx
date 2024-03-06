/* eslint-disable react/no-unescaped-entities */
import React from 'react' // Importing React

// Import Hooks
import { useSelector } from 'react-redux' // Importing useSelector from react-redux to access the redux store

export default function FourthSection () {
  const OwnerDetails = useSelector(state => state.GeneralAppInfo.OwnerDetails.Main_Details) // Getting App Details from Redux Store

  const AppDetails = useSelector(state => state.GeneralAppInfo.AppDetails.Static_Details) // Getting App Details from Redux Store

  return (
    <>
      <br />
      <strong className='ml-5'>Data Security:</strong>
      <br />
      <br />
      <p className='lg:mx-32 ml-5'>
        We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security. <br />{' '}
        <br />
      </p>
      <strong className='ml-5'>Your Choices:</strong>
      <br />
      <br />
      <p className='lg:mx-32 ml-5'>
        1. <strong>Access and Correction: </strong> You have the right to access, correct, update, or delete your personal information. You can do this by
        contacting us at {OwnerDetails.Owner_Email}. <br /> <br />
        2. <strong>Opt-Out: </strong> You can opt-out of receiving marketing communications from us by following the instructions provided in our emails
        or by contacting us. <br /> <br />
      </p>
      <strong className='ml-5'>Children's Privacy:</strong>
      <br /> <br />
      <p className='lg:mx-32 ml-5'>
        {AppDetails.App_Name} is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children
        under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us. <br /> <br />
      </p>
      <strong className='ml-5'>Changes to this Privacy Policy:</strong>
      <br />
      <br />
      <p className='lg:mx-32 ml-5'>
        We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page indicates when the Privacy Policy was last
        revised. We encourage you to review this page periodically for any changes. <br /> <br />
      </p>
      <strong className='ml-5'>Contact Us:</strong>
      <br />
      <br />
      <p className='lg:mx-32 ml-5'>
        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at {OwnerDetails.Owner_Email}.
      </p>
      <br />
      <p className='lg:mx-32 ml-5'>
        Thank you for trusting {AppDetails.App_Name} with your personal information. Your privacy is important to us, and we are committed to safeguarding
        it. <br /> <br />
      </p>
    </>
  )
}
