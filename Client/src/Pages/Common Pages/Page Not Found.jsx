/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom' // import the hook from react-router-dom

// This file is use to display the error page when the user is not logged in
import { Update_Document_Title, Update_Internet_Status } from '@helper/Common' // import the function to update the document title
import { useSelector } from 'react-redux' // import the hook from react-redux

// import Chakra UI
import { Button } from '@chakra-ui/react' // import Button component

// import components
import GeneralNavbar from '@component/Navbar/General Navbar' // Navbar
import GeneralFooter from '@component/Footer/General Footer' // Footer

// import React Icons
import { IoMdLogIn } from 'react-icons/io' // import the back icon

export default function NotLoggedIn_Offline ({ Status, Message, ButtonText, ButtonLink }) {
  // Initializer
  const Navigate = useNavigate() // initialize the navigate hook

  // Get All State from Redux Store
  const ReduxState = useSelector(state => state) // Get All State from Redux Store

  // Updaters
  Update_Document_Title(`${Status} - ${ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name}`) // update the document title
  Update_Internet_Status() // update the internet status

  return (
    <>
      <GeneralNavbar />
      <div data-aos='fade-up'>
        <h1 className='text-center mt-[8.75rem] text-xl lg:mt-[8.5rem] font-mono lg:text-3xl text-red-500 font-bold'>{Status}</h1>
        <p className='text-center hidden lg:block lg:mt-5 lg:text-lg font-semibold lg:mx-80'>
          {Message} <br /> Thank you from the team of{' '}
          <a className='bg-cyan-700 text-white px-3 py-1 rounded-full' href={`${window.location.protocol}//${window.location.hostname}`}>
            {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name}
          </a>
        </p>
        <Button
          className='ml-[7.25rem] lg:ml-[38.25rem] mt-[2.25rem]'
          leftIcon={<IoMdLogIn />}
          colorScheme='green'
          onClick={() => {
					  Navigate(ButtonLink)
          }}
        >
          {ButtonText}
        </Button>
      </div>
      <GeneralFooter />
    </>
  )
}

// Default Props
NotLoggedIn_Offline.defaultProps = {
  Status: 'No User Logged In',
  Message:
		'Seems like No User Logged In. Please login with your account, to continue using the app. without login you cannot use the app. please login to continue using the app.',
  ButtonText: 'Go to Login Page',
  ButtonLink: '/login'
}
