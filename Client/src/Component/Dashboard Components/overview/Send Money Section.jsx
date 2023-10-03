import React from "react"; // import react for the component
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token

// Import Icons
import { FaRupeeSign } from "react-icons/fa"; // import the rupee sign icon

// Import Components
import { Button } from "@chakra-ui/react"; // import the button component from chakra ui

// Redux
import { useSelector } from "react-redux"; // import useSelector from react-redux

// 1. Link to Send Money Page
export default function SendMoneySection() {
  // Hooks
  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(AccountDetails.AccountDetails); // decode the jwt token to get the account details

  // States
  const [PaymentInfo, setPaymentInfo] = React.useState({
    ReceivingPaymentID: "",
    TransactionAmount: "",
    SendingClientID: Decoded_Account_Details.data.ClientID,
    SendingPaymentID: Decoded_Account_Details.data.PaymentID,
    SenderName: Decoded_Account_Details.data.Name,
    SenderEmail: Decoded_Account_Details.data.Email,
    SenderPhone: Decoded_Account_Details.data.PhoneNumber,
    TransactionDescription: "",
  }); // state to store the payment info

  // Functions
  // 1. Function to handle the change in the input fields
  const HandleChange = (event) => {
    event.preventDefault(); // prevent the default action
    if (event.target.name === "ReceivingPaymentID") {
      setPaymentInfo({
        ...PaymentInfo,
        [event.target.name]: event.target.value.toLowerCase(),
      }); // update the payment info
      return;
    }
    setPaymentInfo({ ...PaymentInfo, [event.target.name]: event.target.value }); // update the payment info
  }; // end of function to handle the change in the input fields

  // Submission Function
  const SubmitHandler = (event) => {
    event.preventDefault(); // prevent the default action
    console.log(PaymentInfo); // log the payment info
  }; // end of submission function
  return (
    <>
      <form className="w-6/12 ml-[23rem] absolute top-[25%] space-y-5">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Pay Using
          </span>{" "}
          Payment ID
        </h1>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative space-y-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            ></svg>
          </div>
          <input
            type="text"
            id="default-search"
            onChange={HandleChange}
            value={PaymentInfo.ReceivingPaymentID}
            name="ReceivingPaymentID"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Payment ID for Payment"
            required
          />
          <input
            type="number"
            name="TransactionAmount"
            onChange={HandleChange}
            value={PaymentInfo.TransactionAmount}
            placeholder="Enter Amount"
            className="input input-bordered input-accent m-w-full w-full"
            required
          />
          <input
            type="text"
            name="TransactionDescription"
            onChange={HandleChange}
            value={PaymentInfo.TransactionDescription}
            placeholder="Enter Description (optional)"
            className="input input-bordered input-accent m-w-full w-full"
          />
          <Button
            onClick={SubmitHandler}
            leftIcon={<FaRupeeSign />}
            colorScheme="teal"
            variant="solid"
            type="submit"
            className="ml-[14rem] mt-5"
            size={"lg"}
          >
            Send Money
          </Button>
        </div>
      </form>
    </>
  );
}
