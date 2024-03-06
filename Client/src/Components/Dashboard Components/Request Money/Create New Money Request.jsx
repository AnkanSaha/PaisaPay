import React from 'react' // Import React
import { useSelector } from 'react-redux' // import useSelector from react-redux
import { API as Service } from '@helper/Common' // import the Crypto function from the Common file

// Import Components
import {
  Button,
  useDisclosure,
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
  useToast
  // useToast
} from '@chakra-ui/react' // import the chakra ui table components

// Import Icons
import { IoIosCreate } from 'react-icons/io' // import the create icon

export default function CreateNewMoneyRequest () {
  // Hooks
  const toast = useToast() // use toast for the toast notification
  const ReduxState = useSelector(state => state) // get the account details from the redux store

  // Decode All Account Details
  const Decoded_Account_Details = ReduxState.AccountInfo.AccountDetails // decode the jwt token to get the account details

  // States
  const { isOpen, onOpen, onClose } = useDisclosure() // use the useDisclosure hook for the modal
  const [CreateButtonLoading, setCreateButtonLoading] = React.useState(false) // Create Button Loading State
  const [RequestButtonLoading, setRequestButtonLoading] = React.useState(false) // Request Button Loading State
  const [RequestInfo, setRequestInfo] = React.useState({
    SenderPaymentID: '',
    Amount: '',
    TPIN: '',
    RequesterID: Decoded_Account_Details.ClientID,
    RequesterEmail: Decoded_Account_Details.Email,
    RequesterPhoneNumber: Decoded_Account_Details.PhoneNumber,
    RequesterPaymentID: Decoded_Account_Details.PaymentID
  }) // Request Info State

  // Functions
  const OpenModal = () => {
    setCreateButtonLoading(true)
    onOpen()
  }

  const CloseModal = () => {
    setCreateButtonLoading(false)
    onClose()
  }

  const Onchange = event => {
    if (event.target.name === 'SenderPaymentID') {
      setRequestInfo({
        ...RequestInfo,
        [event.target.name]: event.target.value.toLowerCase() // convert the payment id to lowercase
      })
    } else {
      setRequestInfo({
        ...RequestInfo,
        [event.target.name]: event.target.value
      })
    }
  }

  const RequestMoney = async () => {
    if (RequestInfo.SenderPaymentID === '' || RequestInfo.Amount === '' || RequestInfo.TPIN === '') {
      return toast({
        title: 'Error',
        description: 'Please fill in all the fields to continue',
        status: 'error',
        duration: 5000,
        isClosable: true
      }) // return a toast notification
    } else if (RequestInfo.SenderPaymentID === RequestInfo.RequesterPaymentID) {
      return toast({
        title: 'Error',
        description: 'You cannot request money from yourself',
        status: 'error',
        duration: 5000,
        isClosable: true
      }) // return a toast notification
    }
    setRequestButtonLoading(true) // set the request button loading state to true

    // Encrypt the request info
    const Encrypted_Request_Info = RequestInfo // encrypt the request info

    // Send the request to the server
    const Response = await Service.Post('/post/Payment/request-money', {
      Encrypted_Request_Info,
      sessionID: ReduxState.AccountInfo.sessionID
    }) // send the request to the server

    setRequestButtonLoading(false) // set the request button loading state to false

    if (Response.statusCode === 200) {
      CloseModal() // close the modal
      return toast({
        title: Response.Title,
        description: Response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }) // return a toast notification
    } else {
      return toast({
        title: Response.Title,
        description: Response.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      }) // return a toast notification
    }
  }
  return (
    <>
      <Button
        colorScheme='facebook'
        onClick={OpenModal}
        leftIcon={<IoIosCreate />}
        rightIcon={<IoIosCreate />}
        variant='solid'
        className='right-[6%]'
        isLoading={CreateButtonLoading}
        position='absolute'
      >
        Create New Request
      </Button>
      <Modal isOpen={isOpen} onClose={CloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Payment ID (including @pp)</FormLabel>
              <Input
                name='SenderPaymentID'
                onChange={Onchange}
                value={RequestInfo.SenderPaymentID}
                placeholder='Enter the payment ID of the person you want to request money from'
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input name='Amount' onChange={Onchange} value={RequestInfo.Amount} placeholder='Enter the amount you want to request' />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Transaction PIN</FormLabel>
              <Input name='TPIN' onChange={Onchange} value={RequestInfo.TPIN} placeholder='Enter Transaction PIN to continue' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} isLoading={RequestButtonLoading} onClick={RequestMoney}>
              Request Money
            </Button>
            <Button onClick={CloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
} // export the function
