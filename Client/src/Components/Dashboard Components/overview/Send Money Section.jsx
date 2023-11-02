import React from "react"; // import react for the component
import {Cryptography} from '@helper/Common'; // import the cryptography function
import SendMoneyValidate from '@validator/Payment/Send Money'; // import the validator function
import {React as Serve} from 'react-caches'; // import the react caches
// Import Icons
import { FaRupeeSign } from "react-icons/fa"; // import the rupee sign icon

// Import Redux Actions
import {UpdateBalance} from '@redux/Slices/Transaction Details'; // import the transaction details slice

// Import Components
import { Button, useToast } from "@chakra-ui/react"; // import the button component from chakra ui

// Redux
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux

// 1. Link to Send Money Page
export default function SendMoneySection() {
  // Hooks
 const toast = useToast(); // initialize the toast component
  const dispatch = useDispatch(); // initialize the useDispatch hook

  // Redux Store
  const API = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details
        .Live_URL_FOR_API_CALL
  ); // Get API Link from Redux

  // Encrypted Account Details from Redux
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the account details from the redux store
 
  // Decode All Account Details
  const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(AccountDetails.AccountDetails)); // decode the jwt token to get the account details
 
  // States
  const [PaymentInfo, setPaymentInfo] = React.useState({
    ReceivingPaymentID: "",
    TransactionAmount: "",
    SendingClientID: Decoded_Account_Details.ClientID,
    SendingPaymentID: Decoded_Account_Details.PaymentID,
    SenderName: Decoded_Account_Details.Name,
    SenderEmail: Decoded_Account_Details.Email,
    SenderPhone: Decoded_Account_Details.PhoneNumber,
    sessionID: AccountDetails.sessionID,
    TransactionDescription: "",
  }); // state to store the payment info

  const [Loading, setLoading] = React.useState(false); // state to store the loading status

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
  const SubmitHandler = async (event) => {
    event.preventDefault(); // prevent the default action
    setLoading(true); // set the loading to true
    const Result = SendMoneyValidate(PaymentInfo)

    // Check if the validation is successful
    if(Result.status === false) {
      toast({
        title: Result.Title,
        description: Result.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    // Encrypt the Payment Info
    const Encrypted_Payment_Info = await Cryptography.Encrypt(PaymentInfo)
  
    // API Call
    const Response = await Serve.Fetch.Post(`${API}/post/Payment/NewTransaction`, {
      sessionID: AccountDetails.sessionID,
      Encrypted_PaymentInfo: Encrypted_Payment_Info
    })
    if(Response.statusCode !== 200) {
      toast({
        title: "Error",
        description: Response.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      setLoading(false)
      return
    }
    // Update the Balance
    const Decrypted_Balance = JSON.parse(Cryptography.DecryptSync(Response.data)); // decrypt the balance
    dispatch(UpdateBalance(Decrypted_Balance.Balance)); // update the balance in the redux store
   
    setLoading(false)
    toast({
      title: "Success",
      description: Response.message,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }; // end of submission function

  // Force User To Enter Integer Only
  function HandleInputs(event) {
    if (!/^\d+$/.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^\d]/g, '');
    }
  }
  return (
    <>
      <form className="w-7/12 ml-[30rem] absolute top-[25%] space-y-10">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-7xl">
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
        <div className="relative space-y-10">
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
            step='1'
            type="number"
            id="PaymentNumber"
            name="TransactionAmount"
            onChange={HandleChange}
            onInput={HandleInputs}
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
            isLoading={Loading}
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
