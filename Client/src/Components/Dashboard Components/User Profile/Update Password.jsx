import React from 'react' // Import React Package
import { useNavigate } from 'react-router-dom' // Import useNav to use the navigate function to navigate to different pages

// import Components from Chakra UI
import { Heading, InputGroup, InputRightElement, Button, Input, useToast } from '@chakra-ui/react' // import the input component from chakra ui

// Import Helpers
import { API } from '../../../Helper/Common' // import the cryptography function

// import Redux
import { useSelector } from 'react-redux' // import the hook from react-redux

// import Icons
import { TbBraces } from 'react-icons/tb' // import the MdSystemSecurityUpdateGood icon from react-icons/md

export default function UpdatePassword () {
  // Hooks
  const toast = useToast() // set the toast variable to use the useToast hook
  const navigate = useNavigate() // set the navigate variable to use the useNavigate hook

  // Encrypted Account Details from Redux
  const AccountDetails = useSelector(state => state.AccountInfo) // get the account details from the redux store

  // Decode All Account Details
  const Decoded_Account_Details = AccountDetails.AccountDetails // decode the jwt token to get the account details

  // States
  const [show, setShow] = React.useState(false) // set the show state to false
  const [loading, setLoading] = React.useState(false) // set the loading state to false
  const [PasswordInfo, setPasswordInfo] = React.useState({
    CurrentPassword: '',
    NewPassword: '',
    ConfirmNewPassword: '',
    ClientID: Decoded_Account_Details.ClientID,
    Email: Decoded_Account_Details.Email,
    PhoneNumber: Decoded_Account_Details.PhoneNumber,
    PaymentID: Decoded_Account_Details.PaymentID
  }) // set the password info state to an empty object

  // Functions
  const handleClick = () => setShow(!show) // set the show state to the opposite of what it is
  const handleChange = event => {
    setPasswordInfo({
      ...PasswordInfo,
      [event.target.name]: event.target.value
    })
  } // set the password info state to the value of the input

  // Update Password Function
  const UpdatePasswordMethod = async () => {
    if (PasswordInfo.CurrentPassword === '' || PasswordInfo.NewPassword === '' || PasswordInfo.ConfirmNewPassword === '') {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    } else if (PasswordInfo.NewPassword !== PasswordInfo.ConfirmNewPassword) {
      toast({
        title: 'Error',
        description: 'New Password and Confirm New Password do not match',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    } else if (PasswordInfo.NewPassword.includes('@') === false || PasswordInfo.NewPassword.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters long and must contain a special character',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      return
    }
    setLoading(true) // set the loading state to true to show the loading spinner

    // Send the Password Info to the API
    const Response = await API.Put('/put/update/update-password', {
      sessionID: AccountDetails.sessionID,
      Encrypted_Info: PasswordInfo
    })

    // Set the loading state to false to hide the loading spinner
    setLoading(false) // set the loading state to false to hide the loading spinner

    // Check if the response is successful
    if (Response.statusCode === 200) {
      toast({
        title: Response.Title,
        description: Response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      navigate('/dashboard') // navigate to the dashboard page
    } else {
      toast({
        title: Response.Title,
        description: Response.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  return (
    <div className='my-5'>
      <>
        <div className='w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex flex-col items-center space-y-6 py-5'>
            <Heading size='lg'>Change Password</Heading>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter Current Password'
                value={PasswordInfo.CurrentPassword}
                name='CurrentPassword'
                onChange={handleChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter New Password'
                value={PasswordInfo.NewPassword}
                name='NewPassword'
                onChange={handleChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter New Password Again'
                value={PasswordInfo.ConfirmNewPassword}
                name='ConfirmNewPassword'
                onChange={handleChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <Button
            isLoading={loading}
            onClick={UpdatePasswordMethod}
            className='w-full mb-5'
            colorScheme='facebook'
            leftIcon={<TbBraces />}
            rightIcon={<TbBraces />}
          >
            Update PIN
          </Button>
        </div>
      </>
    </div>
  )
} // Export UpdatePassword Function
