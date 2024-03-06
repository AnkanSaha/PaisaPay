import React from 'react' // ← Main React library

// import { useSelector, useDispatch } from 'react-redux'; // ← Main React Redux library
import { Update_Document_Title } from '@helper/Common' // ← Common functions

// import Components here
import GeneralNavbar from '@component/Navbar/General Navbar' // ← Navbar Component
import GeneralFooter from '@component/Footer/General Footer' // ← Footer Component
import SignupForm from '@component/Auth Components/Signup Components/Signup Form' // ← Signup Form Component

function Signup () {
  // react redux hooks
  // const ReduxState = useSelector(state => state); // ← get all state from redux store
  // const Dispatcher = useDispatch(); // ← get all dispatcher from redux store
  Update_Document_Title('Signup') // ← changing the title of document (page)

  return (
    <>
      <GeneralNavbar Text='Login' Link='/auth/login' />
      <SignupForm />
      <GeneralFooter />
    </>
  )
}

export default Signup // ← export the Signup component
