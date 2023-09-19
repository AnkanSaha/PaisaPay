/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react"; //   Import react module for JSX
import {useSelector} from 'react-redux'; //  Import useSelector from react-redux for selecting data from the store/state

// Import Components
import Navbar from "@component/Navbar/General Navbar"; //   Import Navbar
import Footer from "@component/Footer/General Footer"; //   Import Footer

export default function RefundPolicy() {
    //   Get the user data from the store
    const AppName = useSelector((state) => state.GeneralAppInfo.AppDetails.Static_Details.App_Name);
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center mx-10">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Refund Policy for {AppName}</h2>
          <p className="mb-4">
            We regret to inform you that we do not offer refunds for any
            purchases made through our platform.
          </p>
          <p className="mb-4">
            Once a purchase is made, it is considered final, and no refunds will
            be provided, regardless of the circumstances.
          </p>
          <p className="mb-4">
            If you have any questions or concerns about a specific purchase or
            encounter any issues, please don't hesitate to contact our customer
            support team, and we will be happy to assist you.
          </p>
          <p className="text-gray-600">Thank you for choosing our platform.</p>
        </div>
      </div>
      <Footer />
    </>
  );
} //   Export default function for RefundPolicy
