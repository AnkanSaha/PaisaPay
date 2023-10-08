import React from "react"; // import React
import { decodeToken } from "react-jwt"; // import jwt for decoding the jwt token
import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateTransactions } from "@redux/Slices/Transaction Details"; // import the UpdateTransactions action from the Transaction Details slice

// Component
import { LoadingScreen } from "@page/Common Pages/Loading Screen"; // import the loading screen component

export default function PaymentHistoryS() {
  //States
  const [isLoading, setIsLoading] = React.useState(true); // Loading Screen State

  // Hooks
  const toast = useToast(); // use toast for the toast notification
  const dispatch = useDispatch(); // create a dispatch variable to dispatch actions

  // Redux Store
  const ReduxState = useSelector((state) => state); // get the account details from the redux store
  const API = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details
        .Live_URL_FOR_API_CALL
  ); // Get API Link from Redux

  // Decode All Account Details
  const Decoded_Account_Details = decodeToken(
    ReduxState.AccountInfo.AccountDetails
  ); // decode the jwt token to get the account details

  React.useEffect(() => {
    fetch(
      `${API}/get/Payment/TransactionHistory/${Decoded_Account_Details.data.PhoneNumber}/${Decoded_Account_Details.data.Email}`
    ).then((res) => {
      res.json().then((data) => {
        dispatch(UpdateTransactions(decodeToken(data.data).data));
        if (data.statusCode === 200) {
          toast({
            title: "Payment History",
            description: data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Payment History",
            description: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
        setIsLoading(false);
      });
    });
  }, []); // useEffect

  return (
    <>
      {isLoading === true ? (
        <LoadingScreen StatusText=" Loading Payment history" />
      ) : (
        <>
          <h1 className="text-center text-4xl font-mono font-bold mb-5 mt-[1.25rem]">
            Payment History of {Decoded_Account_Details.data.Name}
          </h1>

          <div className="overflow-x-auto w-[79%] ml-5">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {
                    ReduxState.TransactionDetails.Transactions.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <th>{item.TransactionID}</th>
                                <td>{item.TransactionAmount}</td>
                                <td>{item.TransactionDate}</td>
                                <td>{item.TransactionType}</td>
                                <td>{item.TransactionStatus}</td>
                                <td>{item.TransactionDescription}</td>
                            </tr>
                        )
                    })
                }
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
