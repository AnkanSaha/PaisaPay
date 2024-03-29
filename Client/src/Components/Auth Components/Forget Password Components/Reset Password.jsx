import React from 'react' // Importing React
import { useNavigate } from 'react-router-dom' // Import useParams from react-router-dom

// Encrypting and Decrypting
import { API } from '@helper/Common' // Importing Common Functions

// Redux
import { useSelector, useDispatch } from 'react-redux' // Importing useSelector from react-redux
import { addAccountDetails } from '@redux/Slices/Account Slice' // Importing addAccountDetails from Redux/Slices/Account Slice

// Chakra-UI
import { Heading, InputGroup, Input, InputRightElement, Button, useToast } from '@chakra-ui/react' // Importing Chakra-UI Components

import { LoadingScreen } from '@page/Common Pages/Loading Screen' // Importing Loading Screen

// Functions
import { StepThree } from '@validator/Auth/Forget Password' // Importing StepThree from Validator/Auth/Forget Password

export default function ResetPassword () {
  // Show State
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [Loading, setLoading] = React.useState(false) // Loading State

  // Hooks
  const Navigate = useNavigate() // Navigate Function from react-router-dom
  const dispatch = useDispatch() // Dispatch Function from react-redux
  const toast = useToast() // Toast Function from Chakra-UI

  // Redux
  const ReactState = useSelector(state => state) // Getting the state from redux

  // Parameters
  const AccountDetails = useSelector(state => state.AccountInfo.AccountDetails) // Get Account Details from URL

  // Decrypting
  const DecryptedToken = AccountDetails // Decrypting Token

  // Input State
  const [input, setInput] = React.useState({
    PhoneNumber: DecryptedToken.PhoneNumber,
    Email: DecryptedToken.Email,
    Password: '',
    confirmPassword: '',
    LastLoginIP: ReactState.GeneralAppInfo.ClientDetails.ClientIP,
    LastLoginClientDetails: ReactState.GeneralAppInfo.ClientDetails
  })

  // Input Handler
  const inputHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // Submit Handler
  const submitHandler = async e => {
    e.preventDefault()
    const Result = StepThree(input) // Step Three Function from Validator/Auth/Forget Password
    if (Result === true) {
      // Reset Data Object for API
      const ResetData = {
        PhoneNumber: input.PhoneNumber,
        Email: input.Email,
        Password: input.Password,
        LastLoginIP: input.LastLoginIP,
        LastLoginClientDetails: input.LastLoginClientDetails
      }
      setLoading(true) // Set Loading to true
      const Response = await API.Put('/put/auth/Update-Password', ResetData) // Reset Password Function from Helper/Auth/Authentication
      if (Response.statusCode === 200) {
        setLoading(false) // Set Loading to false
        dispatch(addAccountDetails(Response.data)) // Add Account Details to Redux
        toast({
          title: Response.Title,
          description: Response.message,
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        Navigate('/dashboard') // Navigate to Login Page
      } else {
        setLoading(false) // Set Loading to false
        toast({
          title: Response.Title,
          description: Response.message,
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      }
    }
  }
  return (
    <>
      {Loading === true
        ? (
          <LoadingScreen StatusText='Updating Password' />
          )
        : (
          <>
            <Heading className='text-center font-mono mt-5'>Update Password (Step 3 of 3)</Heading>

            <div className='w-6/12 m-auto mt-24 space-y-16'>
              <InputGroup size='lg'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  value={input.Password}
                  name='Password'
                  onChange={inputHandler}
                  placeholder='Set New Password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup size='lg'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  value={input.confirmPassword}
                  name='confirmPassword'
                  onChange={inputHandler}
                  placeholder='Confirm New Password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button colorScheme='telegram' className='w-full' onClick={submitHandler}>
                Update Password
              </Button>
            </div>
          </>
          )}
    </>
  )
}
