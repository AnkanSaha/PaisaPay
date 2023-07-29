import React from 'react'; // ← Main React library
// Importent Modules
import {  } from 'react-router-dom'; // ← Main React Router library
// import { useSelector, useDispatch } from 'react-redux'; // ← Main React Redux library

// import Components here
import GeneralNavbar from '../../Component/Navbar/General Navbar'; // ← Navbar Component
import GeneralFooter from '../../Component/Footer/General Footer'; // ← Footer Component
import SignupForm from '../../Component/Auth Components/Signup Components/Signup Form'; // ← Signup Form Component

function Signup() {
  // react redux hooks
  // const ReduxState = useSelector(state => state); // ← get all state from redux store
  // const Dispatcher = useDispatch(); // ← get all dispatcher from redux store
  return (
    <>
    <GeneralNavbar/>
    <SignupForm />
    <GeneralFooter />
    </>
  )
}

export default Signup; // ← export the Signup component
