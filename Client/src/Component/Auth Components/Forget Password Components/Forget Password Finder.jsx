// Imports
import React from "react"; // Importing React
import { useSelector } from "react-redux"; // Importing useSelector from react-redux

// Components Chakra Ui
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";

import { LoadingScreen } from "../../../Pages/Common Pages/Loading Screen"; // Import Loading Screen

// Icons
import { GrValidate } from "react-icons/gr"; // Import GrValidate Icon

// Functions
import { StepOne } from "@validator/Auth/Forget Password"; // Import StepOne Function
import { ForgetPasswordFinder as StepOneFinder } from "@helper/Auth/Authentication"; // Import ForgetPasswordFinder Function

// Redux
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordFinder() {
  // State Variables
  const [EmailInput, setEmailInput] = React.useState(""); // Email Input
  const [isLoading, setisLoading] = React.useState(false); // Loading Screen
  const isError = EmailInput === "";
  const toast = useToast(); // Toast
  const Navigate = useNavigate(); // Navigate

  // Redux 
  const API = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details
        .Live_URL_FOR_API_CALL
  ); // Get API from Redux

  // Functions
  const handleInputChange = (e) => {
    setEmailInput(e.target.value); // Update Email Input
  }; // Handle Input Change

  // Onsubmit Function
  const handleSubmit = async (e) => {

    e.preventDefault(); // Prevent Default Behavior
   const Validate = StepOne(EmailInput); // Validate the Email Input
    if(Validate === true){
      setisLoading(true); // Set Loading Screen to True
      const Result = await StepOneFinder(API, EmailInput); // Get Result from StepOneFinder Function
      if (Result.statusCode === 200){
        Navigate(`/auth/forget-password/${Result.data}`); // Navigate to Step 2
        setisLoading(false); // Set Loading Screen to False
      }
      toast({
        title: Result.Title,
        description: Result.message,
        status: Result.status === true ? "success" : "error",
        duration: 5000,
        isClosable: true,
      }); // Toast
      setisLoading(false); // Set Loading Screen to False
    }
  }
  return (
    <>
    {
      isLoading === true ? <LoadingScreen StatusText="Finding Account Details" /> : (
<div className="w-6/12 m-auto mt-[7.25rem]">
        <Heading className="text-center my-10">
          {" "}
          Forget Password (Step 1 of 3)
        </Heading>
        <FormControl isInvalid={isError}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="ex: ankan@company.com"
            type="email"
            value={EmailInput}
            onChange={handleInputChange}
          />
          {!isError ? (
            <FormHelperText>
              This Email will be used to Find your Account Details
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <Button
            colorScheme="green"
            rightIcon={<GrValidate />}
            className="mt-10"
            onClick={handleSubmit}
          >
            Validate
          </Button>
        </FormControl>
      </div>
      )
    }
      
    </>
  );
}
