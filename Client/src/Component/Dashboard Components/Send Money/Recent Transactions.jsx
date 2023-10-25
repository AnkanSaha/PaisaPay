import React from "react"; // import React
import { useToast } from "@chakra-ui/react"; // Import Chakra UI Toast
import { useSelector, useDispatch } from "react-redux"; // import useSelector from react-redux
import { UpdateTransactions } from "@redux/Slices/Transaction Details"; // import the UpdateTransactions action from the Transaction Details slice
import { Cryptography } from "@helper/Common"; // import the Crypto function from the Common file
import { React as Service } from "react-caches"; // import the react-caches library
import Moment from "moment"; // import moment for date formatting

// Component
import { LoadingScreen } from "@page/Common Pages/Loading Screen"; // import the loading screen component
import SendMoneySection from "@component/Dashboard Components/Send Money/Send Money Section"; // import the send money section component

// import Chakra UI
import { List, ListItem, ListIcon } from "@chakra-ui/react"; // import the list component from chakra ui

// import icons
import { MdCheckCircle } from "react-icons/md"; // import the check circle and settings icon from react icons
import {GiCrossMark} from "react-icons/gi"; // import the cross mark icon from meronex icons

export default function RecentTransactions() {
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
  const Decoded_Account_Details = JSON.parse(
    Cryptography.DecryptSync(ReduxState.AccountInfo.AccountDetails)
  ); // decode the jwt token to get the account details

  React.useEffect(() => {
    Cryptography.Encrypt(Decoded_Account_Details.PhoneNumber).then(
      (PhoneNumber) => {
        Cryptography.Encrypt(Decoded_Account_Details.Email).then((Email) => {
          Service.Fetch.Post(`${API}/post/Payment/TransactionHistory`, {
            Number: PhoneNumber,
            Email: Email,
            sessionID: ReduxState.AccountInfo.sessionID,
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
            } else if (Response.statusCode === 200) {
              Cryptography.Decrypt(Response.data).then((ParsedData) => {
                dispatch(UpdateTransactions(JSON.parse(ParsedData)));
              });
            }
            setIsLoading(false);
          });
        });
      }
    );
  }, []); // useEffect
  return (
    <>
      {isLoading === true ? (
        <LoadingScreen StatusText=" Loading Payment history" />
      ) : (
        <div>
          <SendMoneySection />
          <h1 className="text-base font-mono font-bold mb-5 mt-[1.25rem] ml-5">
            Transaction History of {Decoded_Account_Details.Name}
          </h1>
          <List spacing={3} className="ml-5">
          {ReduxState.TransactionDetails.Transactions.map((item, index)=>{
            return(
              <ListItem key={index} className="text-sm">
              <ListIcon as={item.TransactionStatus === "Transaction Failed" ? GiCrossMark : MdCheckCircle } color={item.TransactionStatus === "Transaction Failed" ? "red.500" : "green.500"} />
              ₹ {item.TransactionAmount} {item.TransactionType} on {Moment(item.TransactionDate).format('DD-MM-YYYY HH:mm:ss A')}
            </ListItem>
            )
          })}
          
          </List>
        </div>
      )}
    </>
  );
}
