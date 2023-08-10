import React from "react"; // Importing react
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector from react-redux
import { Login } from "../../../Helper/Auth/Authentication"; // Importing Login function from Authentication.jsx
import VerifyLoginData from '../../../validator/Auth/Login'; // Importing VerifyLoginData function from Login.jsx 

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
  import {MdCreateNewFolder} from 'react-icons/md'; // Importing Create New Folder Icon
  import {addAccountDetails} from '../../../App/Redux/Slices/Account Slice'; // Importing Account Slice
  import {LoadingScreen} from '../../../Pages/Common Pages/Loading Screen'; // Importing Loading Screen

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
          Dispatch(addAccountDetails(LoginResult.data)); // Add Account Details to Redux Store
          navigate('/dashboard'); // Navigate to Dashboard
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
    
    return (
      <>
        <Modal
        initialFocusRef={PhoneNumber}
        finalFocusRef={Password}
        isOpen={isOpen}
        scrollBehavior="inside"
        size={'xl'}
        variant={'ghost'}
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
            <Button colorScheme="facebook" rightIcon={<MdCreateNewFolder/>} mr={3} onClick={()=>{navigate('/auth/create-account')}}>Create Account</Button>
            <Button onClick={()=>{navigate('/')}}>Go Back</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <LoadingScreen StatusText="Please wait while we are logging you in..." />
      </>
    )
}