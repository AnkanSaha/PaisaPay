/* eslint-disable react/prop-types */
import React from 'react' // Import React

// Redux
import { useSelector, useDispatch } from 'react-redux' // Import UseSelector
import { UpdateUserImageURl } from '@redux/Slices/Transaction Details' // Import General App Info Slice

// import React Modules
import { Link, useNavigate, useLocation } from 'react-router-dom' // Import Link

// Import Icons
import { LocalAnonymousUserLogo } from '@app/App_Config' // import the anonymous user logo

// SideBar import
import Sidebar from '@component/Dashboard Components/Sidebar' // import the sidebar component

function GeneralNavbar () {
  // initializes
  const navigate = useNavigate() // Create navigate function
  const Location = useLocation() // Create Location Function

  // get All State from Redux Store
  const Dispatch = useDispatch() // Create Dispatch Function
  const ReduxState = useSelector(state => state) // Get All State from Redux Store
  const AccountDetails = useSelector(state => state.AccountInfo) // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = AccountDetails.AccountDetails // decode the jwt token to get the account details

  // Load User ProfileImageURL To Redux Store
  Dispatch(
    UpdateUserImageURl(
			`${ReduxState.GeneralAppInfo.ApplicationConfig.Frontend_Details.Live_URL_FOR_API_CALL}/get/Profile/ProfilePic/${Decoded_Account_Details.ProfilePicFileName}`
    )
  )

  // logic for color scheme
  let BgColorScheme
  let TextColorScheme

  // logic for the navbar
  if (Location.pathname === '/') {
    BgColorScheme = 'transparent' // set the color scheme to transparent
    TextColorScheme = 'white' // set the text color scheme to white
  } else {
    BgColorScheme = 'white' // set the color scheme to white
    TextColorScheme = 'black' // set the text color scheme to black
  }

  return (
    <div className={`navbar ${Location.pathname === '/' ? 'bg-transparent' : 'bg-white'} text-${TextColorScheme} rounded-b-lg`}>
      <div className='navbar-start z-50'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </label>
          <ul tabIndex={0} className={`menu menu-sm 'bg-${BgColorScheme}' text-black  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50`}>
            <li>
              <Link to='/privacy'>Privacy Policy</Link>
              <Link to='/about'>About Us</Link>
              <Link to='/help'>Help Center</Link>
              <Link to='/refund-Policy'> Refund Policy</Link>
            </li>
          </ul>
        </div>
        <div className={`avatar ${Decoded_Account_Details.AccountStatus === 'Active' ? 'online' : 'offline'}`}>
          <div className='lg:w-14 w-12 mt-2 rounded-full ml-5 cursor-pointer' onClick={() => navigate('/')}>
            <img src={ReduxState.TransactionDetails.UserProfileImageURl ? ReduxState.TransactionDetails.UserProfileImageURl : LocalAnonymousUserLogo} />
          </div>
        </div>
        <button onClick={() => navigate('/')} className='btn btn-ghost normal-case text-xl mx-5 hidden lg:flex md:flex'>
          {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name}
        </button>
      </div>
      <div className={`navbar-center hidden lg:flex bg-${BgColorScheme} text-${TextColorScheme}`}>
        <ul className='menu menu-horizontal px-1 font-bold'>
          <li>
            <Link to='/privacy'>Privacy Policy</Link>
          </li>
          <li>
            <Link to='/about'>About Us</Link>
          </li>
          <li>
            <Link to='/help'>Help Center</Link>
          </li>
          <li>
            <Link to='/refund-Policy'> Refund Policy</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <Sidebar />
      </div>
    </div>
  )
} // Export the function
export default React.memo(GeneralNavbar) // Export the function
