import React from 'react' // This is installed with react by default.
import { useNavigate } from 'react-router-dom' // import the useNavigate hook from react-router-dom

// Redux
import { useSelector } from 'react-redux' // import the hook from react-redux

// Import Variables
import { LocalUserPicUpload } from '@app/App_Config' // import the anonymous user logo

// This is the component that will be used to update the user's profile picture
import { Heading, Button, useToast, InputGroup, InputRightElement, Input } from '@chakra-ui/react' // import the heading component from chakra ui

// Import API Call
import { API } from '@helper/Common' // import the api call function

// icons
import { FaUpload } from 'react-icons/fa' // import the upload icon

export default function UpdateProfilePicture () {
  // Hooks
  const user = useSelector(state => state.AccountInfo) // get the user from the redux store
  const Toast = useToast() // use the toast hook
  const navigate = useNavigate() // use the navigate hook

  // States
  const [isLoading, setIsLoading] = React.useState(false) // set the loading state to false
  const [profilePicture, setProfilePicture] = React.useState(null) // set the profile picture state to null
  const [TransactionPIN, setTransactionPIN] = React.useState(null) // set the transaction pin state to null
  const [show, setShow] = React.useState(false) // set the show state to false

  // Data
  const Decoded_Data = user.AccountDetails // decrypt the user's data

  const handleClick = () => setShow(!show) // function to toggle the show state

  // Function to update the user's profile picture
  const Handler = event => {
    setProfilePicture(event.target.files[0]) // set the profile picture to the file that was uploaded
  }

  // Function to handle the change in the input fields
  const HandleChange = event => {
    event.preventDefault() // prevent the default action
    setTransactionPIN(event.target.value) // set the transaction pin to the value of the input field
  }

  // Create Submit Handler
  const SubmitHandler = async e => {
    e.preventDefault()

    if (profilePicture === null || profilePicture === undefined) {
      return Toast({ title: 'Please select a profile picture', status: 'error', duration: 3000, isClosable: true })
    }

    if (TransactionPIN === null || TransactionPIN === undefined) {
      return Toast({ title: 'Please enter your transaction pin', status: 'error', duration: 3000, isClosable: true })
    }

    setIsLoading(true)

    // Create Form Data
    const formData = new FormData()
    formData.append('profilePicture', profilePicture) // append the profile picture to the form data
    formData.append('sessionID', user.sessionID) // append the session id to the form data
    formData.append('ClientID', Decoded_Data.ClientID) // append the user id to the form data
    formData.append('PhoneNumber', Decoded_Data.PhoneNumber) // append the user id to the form data
    formData.append('Email', Decoded_Data.Email) // append the user id to the form data
    formData.append('TransactionPIN', TransactionPIN) // append the user id to the form data

    // // Log FormData for debugging
    // 	for (let [key, value] of formData.entries()) {
    // 	console.log(key, value);
    // 	}

    const response = await API.FormDataPut('/put/user/update-profile-picture', formData)
    setIsLoading(false) // set the loading state to false
    if (response.statusCode !== 200) {
      return Toast({ title: response.Title, description: response.message, status: 'error', duration: 3000, isClosable: true })
    } // show the error message

    Toast({ title: response.Title, description: response.message, status: 'success', duration: 3000, isClosable: true }) // show the success message
    navigate('/dashboard') // navigate to the dashboard page
  }

  return (
    <div className='my-5'>
      <>
        <div className='w-full ml-10  max-w-[25rem] mt-10 px-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <Heading size='md' className=' font-bold text-center mt-5'>
            {' '}
            Select Profile Picture to Upload
          </Heading>
          <div className='py-5 px-10 justify-center items-center flex'>
            <div className='avatar lg:block hidden'>
              <div
                className='w-28 p-2 hover:bg-gray-100 rounded-lg  cursor-pointer'
                onClick={e => {
								  e.preventDefault()
                  document.querySelector('.file-input').click()
                }}
              >
                <img src={profilePicture !== null ? URL.createObjectURL(profilePicture) : LocalUserPicUpload} />
              </div>
              <input
                type='file'
                name='profilePicture'
                accept='image/jpeg, image/png , image/jpg, image/webp'
                size={1 * 1024 * 1024}
                onChange={Handler}
                encType='multipart/form-data'
                placeholder='Upload Profile Picture'
                className='hidden file-input'
              />
            </div>
          </div>
          <InputGroup size='md' className='my-5'>
            <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter Your Transaction PIN to Update' onChange={HandleChange} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button
            onClick={SubmitHandler}
            isLoading={isLoading}
            leftIcon={<FaUpload />}
            rightIcon={<FaUpload />}
            colorScheme='pink'
            variant='solid'
            className='w-full mb-5'
          >
            Upload Now
          </Button>
        </div>
      </>
    </div>
  )
}
