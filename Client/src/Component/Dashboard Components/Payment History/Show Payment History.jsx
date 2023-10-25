import React from "react"; // import React
import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateTransactions } from "@redux/Slices/Transaction Details"; // import the UpdateTransactions action from the Transaction Details slice
import Moment from "moment"; // import moment for date formatting
import {Cryptography} from '@helper/Common'; // import the Crypto function from the Common file
import {React as Service} from 'react-caches'; // import the react-caches library

// Icons
import { List, ListItem, ListIcon } from "@chakra-ui/react"; // import the list components from Chakra UI
import { MdCheckCircle } from "react-icons/md"; // import the check circle icon from react icons
import { GiCrossMark } from "react-icons/gi"; // import the cross mark icon from react icons

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
  const Decoded_Account_Details = JSON.parse(Cryptography.DecryptSync(
    ReduxState.AccountInfo.AccountDetails
  )); // decode the jwt token to get the account details

  React.useEffect(() => {
    Cryptography.Encrypt(Decoded_Account_Details.PhoneNumber).then(PhoneNumber => {
      Cryptography.Encrypt(Decoded_Account_Details.Email).then(Email => {
        Service.Fetch.Post(`${API}/post/Payment/TransactionHistory`, {
          Number: PhoneNumber,
          Email: Email,
          sessionID: ReduxState.AccountInfo.sessionID
        }).then((Response) => {
            if (!Response.statusCode === 200) {
              toast({
                title: "Payment History",
                description: Response.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
            }
            else if(Response.statusCode === 200){
              Cryptography.Decrypt(Response.data).then((ParsedData) => {
                dispatch(UpdateTransactions(JSON.parse(ParsedData)));
              });
            }
            setIsLoading(false);
          });
      })
    })
    
  }, []); // useEffect

  return (
    <>
      {isLoading === true ? (
        <LoadingScreen StatusText=" Loading Payment history" />
      ) : (
        <>
          <h1 className="text-center text-4xl font-mono font-bold mb-5 mt-[1.25rem]">
            Payment History of {Decoded_Account_Details.Name}
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
                ReduxState.TransactionDetails.Transactions.map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <th>{item.TransactionID}</th>
                         <td>₹ {item.TransactionAmount}</td>
                        <td>{Moment(item.TransactionDate).format('DD-MM-YYYY HH:mm:ss A')}</td>
                        <td>{item.TransactionType}</td>
                        <td>
                        <List>
                            <ListItem key={index}>
                              <ListIcon
                                as={
                                  item.TransactionStatus ===
                                  "Transaction Failed"
                                    ? GiCrossMark
                                    : MdCheckCircle
                                }
                                color={
                                  item.TransactionStatus ===
                                  "Transaction Failed"
                                    ? "red.500"
                                    : "green.500"
                                }
                              />
                              {item.TransactionStatus === "Transaction Failed"
                                ? "Failed"
                                : item.TransactionStatus ===
                                  "Transaction Success"
                                ? "Success"
                                : "Pending"}
                            </ListItem>
                          </List>
                          </td>
                        <td>{item.TransactionDescription}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
