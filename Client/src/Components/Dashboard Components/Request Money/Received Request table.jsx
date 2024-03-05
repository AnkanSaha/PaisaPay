import React from 'react' // Import React
import { useSelector } from 'react-redux' // import useSelector from react-redux
import Moment from 'moment' // import moment for date formatting
import { API as Service } from '@helper/Common' // import the Crypto function from the Common file
import { useNavigate } from 'react-router-dom' // import the link component from react-router-dom

// import Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react' // import the chakra ui table components
import { LoadingScreen } from '@page/Common Pages/Loading Screen' // import the loading screen component

// import icons
import { PiContactlessPaymentLight } from 'react-icons/pi' // import the payment icon

export default function ReceivedRequestTable () {
  // Redux Store
  const ReduxState = useSelector(state => state) // get the account details from the redux store

  // Decode All Account Details
  const Decoded_Account_Details = ReduxState.AccountInfo.AccountDetails // decode the jwt token to get the account details

  // States
  const [isLoading, setIsLoading] = React.useState(true) // Loading Screen State
  const [PaymentButtonLoading, setPaymentButtonLoading] = React.useState(false) // Request Button Loading State
  const [ReceivedRequest, setReceivedRequest] = React.useState([]) // Received Request State
  const [PaymentInfo, setPaymentInfo] = React.useState({
    // Payment Info State
    ReceivingPaymentID: '',
    TransactionAmount: '',
    RequestID: '',
    SendingClientID: Decoded_Account_Details.ClientID,
    SendingPaymentID: Decoded_Account_Details.PaymentID,
    SenderName: Decoded_Account_Details.Name,
    SenderEmail: Decoded_Account_Details.Email,
    SenderPhone: Decoded_Account_Details.PhoneNumber,
    TransactionDescription: '',
    TransactionPIN: ''
  }) // Payment Info State

  // Hooks
  const toast = useToast() // use toast for the toast notification
  const { isOpen, onOpen, onClose } = useDisclosure() // use the useDisclosure hook for the modal
  const navigate = useNavigate() // use the navigate hook for navigation

  // Use Effect
  React.useEffect(() => {
    Service.Get(
			`/get/Payments/listofrequests/?ClientID=${Decoded_Account_Details.ClientID}&Email=${Decoded_Account_Details.Email}&sessionID=${ReduxState.AccountInfo.sessionID}`
    ).then(Response => {
      if (Response.statusCode === 200) {
        setReceivedRequest(Response.data) // set the received request state
        setIsLoading(false) // set the loading screen to false
      } else {
        setIsLoading(false) // set the loading screen to false
        toast({
          title: Response.Title,
          description: Response.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        }) // display the toast notification
      }
    })
  }, []) // load the page

  // Payment Function
  const Onchange = event => {
    setPaymentInfo({
      ...PaymentInfo,
      [event.target.name]: event.target.value
    }) // update the payment info
  }

  // Functions
  const OpenModal = () => {
    onOpen()
  }

  const CloseModal = () => {
    onClose()
  }
  const LoadPaymentInfoInState = (ReceivingPaymentID, TransactionAmount, RequestID) => {
    OpenModal()
    setPaymentInfo({
      ...PaymentInfo,
      ReceivingPaymentID,
      RequestID,
      TransactionAmount
    }) // update the payment info
  }

  const PayNow = async () => {
    if (PaymentInfo.TransactionPIN === '') {
      toast({
        title: 'Transaction PIN is required',
        description: 'Please enter your transaction PIN to continue',
        status: 'error',
        duration: 9000,
        isClosable: true
      }) // display the toast notification
      return
    }
    setPaymentButtonLoading(true) // set the payment button loading to true
    // Encrypt All the Payment Info
    const Encrypted_Request_Info = PaymentInfo // encrypt the payment info

    // Send the request to the server
    const Response = await Service.Post('/post/Payment/send-money-for-request', {
      Encrypted_Request_Info,
      sessionID: ReduxState.AccountInfo.sessionID
    })
    if (Response.statusCode === 200) {
      setPaymentButtonLoading(false) // set the payment button loading to false
      toast({
        title: Response.Title,
        description: Response.message,
        status: 'success',
        duration: 9000,
        isClosable: true
      }) // display the toast notification
      navigate('/dashboard') // navigate to the dashboard
    } else {
      toast({
        title: Response.Title,
        description: Response.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      }) // display the toast notification
      setPaymentButtonLoading(false) // set the payment button loading to false
    }
  }
  return (
    <>
      {isLoading === true
        ? (
          <LoadingScreen StatusText=' Loading All Payment Request Report' />
          )
        : (
          <>
            <TableContainer className='mx-10 mt-16'>
              <Table variant='simple'>
                <TableCaption> All the received requests will be displayed here. </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Request ID</Th>
                    <Th>Requester Name</Th>
                    <Th>Requester Payment ID</Th>
                    <Th>Requested Date & Time</Th>
                    <Th> Amount </Th>
                    <Th> Request Status </Th>
                    <Th> Take Payment Action </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ReceivedRequest.map((Request, index) => {
								  return (
  <Tr key={index}>
    <Td>{Request.RequestID}</Td>
    <Td>{Request.RequesterName}</Td>
    <Td>{Request.RequesterPaymentID}</Td>
    <Td> {Moment(Request.TransactionDate).format('DD/MM/YYYY hh:mm:ss A')} </Td>
    <Td> ₹{Request.TransactionAmount} </Td>
    <Td> {Request.TransactionStatus} </Td>
    <Td>
      {' '}
      <Button
        leftIcon={<PiContactlessPaymentLight />}
        rightIcon={<PiContactlessPaymentLight />}
        colorScheme={Request.TransactionStatus === 'Pending' ? 'green' : 'red'}
        variant='solid'
        isDisabled={Request.TransactionStatus !== 'Pending'}
        onClick={() => {
													  LoadPaymentInfoInState(Request.RequesterPaymentID, Request.TransactionAmount, Request.RequestID)
        }}
      >
        {' '}
        {Request.TransactionStatus === 'Pending' ? 'Pay Now' : 'Paid'}
      </Button>{' '}
    </Td>
  </Tr>
								  )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Modal isOpen={isOpen} onClose={CloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Pay To {PaymentInfo.ReceivingPaymentID}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isRequired mt={4}>
                    <FormLabel>Transaction PIN</FormLabel>
                    <Input name='TransactionPIN' onChange={Onchange} value={PaymentInfo.TransactionPIN} placeholder='Enter Transaction PIN to continue' />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} isLoading={PaymentButtonLoading} onClick={PayNow}>
                    Pay Instantly
          </Button>
                  <Button onClick={CloseModal}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
          )}
    </>
  ) // End of return statement
} // End of ReceivedRequestTable()
