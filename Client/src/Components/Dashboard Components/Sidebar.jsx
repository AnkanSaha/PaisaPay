import { useToast } from "@chakra-ui/react";
import React from "react"; // import react
import { Link } from "react-router-dom"; // import Link from react-router-dom

// Import Icons
import { BiDollarCircle } from "react-icons/bi"; // import AiOutlineDollar from react-icons/ai
import { FaHistory } from "react-icons/fa"; // import FaHistory from react-icons/fa
import { MdOutlineSendToMobile } from "react-icons/md"; // import MdOutlineSendToMobile from react-icons/md
import { BiMoneyWithdraw } from "react-icons/bi"; // import BiMoneyWithdraw from react-icons/bi
import { CgProfile } from "react-icons/cg"; // import CgProfile from react-icons/cg
import { AiOutlineQrcode } from "react-icons/ai"; // import AiOutlineQrcode from react-icons/ai
import { BiSolidHelpCircle } from "react-icons/bi"; // import BiSolidHelpCircle from react-icons/bi
import { BsFillCaretLeftSquareFill } from "react-icons/bs"; // import BsFillCaretLeftSquareFill from react-icons/bs
import { AiOutlineDoubleRight } from "react-icons/ai"; // import AiOutlineDoubleRight from react-icons/ai
import { MdRequestQuote } from "react-icons/md"; // import MdRequestQuote from react-icons/md

// Import Storage Function
import { Cache } from "../../App/App_Config"; // Import Cache from App_Config.jsx

// Redux
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux

// Import States Actions
import { deleteAccountDetails } from "@redux/Slices/Account Slice"; // Import Account Slice

export default function Sidebar() {
  // Hooks
  const Dispatch = useDispatch(); // Create Dispatch Function
  const Toast = useToast(); // Create Toast Function

  // React Stores
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details =  AccountDetails.AccountDetails; // decode the jwt token to get the account details

  // Logic For Navbar Button

  const LogoutFunction = async () => {
    await Cache.Account.DeleteCache('Account_Details'); // Delete Account Details
    Dispatch(deleteAccountDetails()); // Update Account Details
  };
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div
        onClick={() => {
          document.getElementById("logo-sidebar").classList.toggle("hidden");
        }}
      >
        <BsFillCaretLeftSquareFill className="w-10 h-10 mr-3 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
      </div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 right-0 hidden z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div
            className="flex items-center pl-2.5 mb-5"
            onClick={() => {
              document
                .getElementById("logo-sidebar")
                .classList.toggle("hidden");
            }}
          >
            <AiOutlineDoubleRight className="w-10 h-10 mr-3 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {Decoded_Account_Details.Name}
            </span>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-funds"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <BiDollarCircle />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add Funds{" "}
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/Transactions-history"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <FaHistory />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap"> History</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/send-money"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <MdOutlineSendToMobile />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Send Money
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/withdraw-funds"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <BiMoneyWithdraw />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Withdraw Funds
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/request-money"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <MdRequestQuote />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                 Request Money
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/user-profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <CgProfile />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  User Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/QR-Code"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <AiOutlineQrcode />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  View QR Code
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/help-support"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <BiSolidHelpCircle />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Help & Support
                </span>
              </Link>
            </li>
            <li>
              <a
                onClick={() => {
                  LogoutFunction();
                  Toast({
                    title: "Logout Successful",
                    description:
                      "You have been logged out successfully, Redirecting you to the login page",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                  }); // Create Toast
                }}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
