/* eslint-disable react/prop-types */
import React from "react"; // Import React
import { useSelector, useDispatch } from "react-redux"; // Import UseSelector

// import React Material-UI Components
import { BiSolidUserCircle } from "react-icons/bi"; // Import HiUserCircle Icon
import { Button, useToast } from "@chakra-ui/react"; // Import Chakra UI Button

// import React Modules
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import Link

// Import States Actions
import {deleteAccountDetails} from '../../App/Redux/Slices/Account Slice'; // Import Account Slice

// Import Storage Function
import { Cache } from "../../App/App_Config"; // Import Cache from App_Config.jsx

function GeneralNavbar() {
  // initializes
  const navigate = useNavigate(); // Create navigate function
  const Location = useLocation(); // Create Location Function
  const Toast = useToast(); // Create Toast Function

  // get All State from Redux Store
  const Dispatch = useDispatch(); // Create Dispatch Function
  const ReduxState = useSelector((state) => state); // Get All State from Redux Store

  // logic for color scheme
  let BgColorScheme;
  let TextColorScheme;

  // logic for the navbar
  if (Location.pathname === "/") {
    BgColorScheme = "transparent"; // set the color scheme to transparent
    TextColorScheme = "white"; // set the text color scheme to white
  } else {
    BgColorScheme = "white"; // set the color scheme to white
    TextColorScheme = "black"; // set the text color scheme to black
  }

  // Logic For Navbar Button

const LogoutFunction = async () => {
  await Cache.Account.clearCache(); // Clear Account Cache
  Dispatch(deleteAccountDetails()); // Update Account Details
};

  return (
    <div
      className={`navbar ${
        Location.pathname === "/" ? "bg-transparent" : "bg-white"
      } text-${TextColorScheme} rounded-b-lg`}
    >
      <div className="navbar-start z-50">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm 'bg-${BgColorScheme}' text-black  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50`}
          >
            <li>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/about">About Us</Link>
              <Link to="/help">Help Center</Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost normal-case text-xl"
        >
          {ReduxState.GeneralAppInfo.AppDetails.Static_Details.App_Name}
        </button>
      </div>
      <div
        className={`navbar-center hidden lg:flex bg-${BgColorScheme} text-${TextColorScheme}`}
      >
        <ul className="menu menu-horizontal px-1 font-bold">
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/help">Help Center</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Button
          onClick={() => {
           LogoutFunction();
            Toast({
              title: "Logout Successful",
              description: "You have been logged out successfully, Redirecting you to the login page",
              status: "warning",
              duration: 5000,
              isClosable: true,
            }); // Create Toast
          }}
          rightIcon={<BiSolidUserCircle />}
          className="herosubtext mr-[0rem] lg:mr-5 rounded-full"
          colorScheme="blue"
        >
          Logout
        </Button>
      </div>
    </div>
  );
} // Export the function
export default React.memo(GeneralNavbar); // Export the function