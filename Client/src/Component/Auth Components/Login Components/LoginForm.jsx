import React from "react"; // Importing react
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector from react-redux
import { Login } from "@helper/Auth/Authentication"; // Importing Login function from Authentication.jsx
import VerifyLoginData from '@validator/Auth/Login'; // Importing VerifyLoginData function from Login.jsx 

// Import Components
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
  } from '@chakra-ui/react'; // Importing Chakra UI Components

  import {BsFillShieldLockFill} from 'react-icons/bs'; // Importing Shield Icon
  import {Si1Password} from 'react-icons/si'; // Importing Create New Folder Icon
  import {addAccountDetails} from '@app/Redux/Slices/Account Slice'; // Importing Account Slice
  import {LoadingScreen} from '@page/Common Pages/Loading Screen'; // Importing Loading Screen


  // Import Client Side Storage
  import { Cache } from "@app/App_Config"; // Importing Cache from App_Config.jsx

export default function LoginForm (){
    // Initializing useNavigate
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI Modal Hooks
    const ReduxStore = useSelector(state => state); // Initializing Redux Store
    const toast = useToast(); // Chakra UI Toast Hooks
    const Dispatch = useDispatch(); // Initializing useDispatch

    // Chakra UI Modal Hooks
    React.useEffect(() => {
        onOpen(); // Open the modal when the component mounts
      }, []); // Empty array ensures this effect runs only once on mount

  // Refs for the modal
    const PhoneNumber = React.useRef();
    const Password = React.useRef();

    // Function for Login
    const SubmitHandler = async (e) => {
      e.preventDefault();
      const LoginData = {
        PhoneNumber: PhoneNumber.current.value,
        Password: Password.current.value,
        LastLoginIP: ReduxStore.GeneralAppInfo.ClientDetails.ClientIP,
        LastLoginClientDetails: ReduxStore.GeneralAppInfo.ClientDetails,
      }
      const VerificationResult = await VerifyLoginData(LoginData); // Verify Login Data
      if(VerificationResult === true){
        onClose(); // Close the modal
        const LoginResult = await Login(ReduxStore.GeneralAppInfo.ApplicationConfig.Frontend_Details.Live_URL_FOR_API_CALL, LoginData); // Login
        
        if(LoginResult.statusCode === 200){
          toast({
            title: LoginResult.Title,
            description: LoginResult.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          Cache.Account.saveCache('Account_Details', LoginResult.data.AccountDetails); // Save Account Details to Cache Storage
          Cache.Account.saveCache('Login_Token', LoginResult.data.LoginToken); // Save  Login Token to Cache Storage
          
          Dispatch(addAccountDetails(LoginResult.data)); // Add Account Details to Redux Store
          navigate('/dashboard'); // Navigate to Dashboard
        }
        else if(LoginResult.statusCode === 404){
          toast({
            title: LoginResult.Title,
            description: LoginResult.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            icon: 'warning',
          })
  
          navigate('/auth/create-account'); // Navigate to Create Account
        }
        else {
          toast({
            title: LoginResult.Title,
            description: LoginResult.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
  
          onOpen(); // Open the modal
        }
      }
    }

    // Closing Function
    const CloseModal = () => {
      onClose(); // Close the modal
      navigate('/'); // Navigate to Home Page
    }

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        CloseModal(); // Close the modal
      }
      else if(e.key === 'Enter'){
        SubmitHandler(e); // Submit the form
      }
      else if(e.ctrlKey && e.key === 'r' || e.ctrlKey && e.key === 'R'){
        e.preventDefault();
        navigate('/auth/forget-password') // Navigate to Forget Password Page
      }
    }) // Event Listener for Escape Key and Enter Key
    
    return (
      <>
        <Modal
        initialFocusRef={PhoneNumber}
        finalFocusRef={Password}
        isOpen={isOpen}
        scrollBehavior="inside"
        size={'xl'}
        variant={'ghost'}
        onClose={CloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login To Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Phone Number *</FormLabel>
              <Input ref={PhoneNumber} type="number" className="font-bold" placeholder='Enter your phone number' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password *</FormLabel>
              <Input ref={Password} type="password" className="font-bold" placeholder='Enter your password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='whatsapp' rightIcon={<BsFillShieldLockFill/>} onClick={SubmitHandler} mr={3}>
                Login Securely
            </Button>
            <Button colorScheme="facebook" rightIcon={<Si1Password/>} mr={3} onClick={()=>{navigate('/auth/forget-password')}}>Reset Password</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <LoadingScreen StatusText="Please wait while we are logging you in..." />
      </>
    )
}