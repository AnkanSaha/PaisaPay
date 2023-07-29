import React from 'react'

// Import Some Components
import { Button } from '@chakra-ui/react'; // This is for Button
import {RiAccountPinCircleFill} from 'react-icons/ri'; // This is for Account Icon
import {FaUpload} from 'react-icons/fa'; // This is for Upload Icon

export default function SignupForm() {
  // States
  const [FormData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    ID_Type: '',
    ID_Number: '',
    password: '',
    confirmPassword: '',
    Profile_Picture_Link: ''
  });
  const [profilePictureDetails, setProfilePictureDetails] = React.useState({
    file: null,
    UploadButtonText:"Upload Now",
    UploadStatus: false
  });

  // Handler
  const Handler = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

     // Handler for profile picture change
     const handleProfilePictureChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePictureDetails({...profilePictureDetails, file: file, UploadButtonText: "Selected, Upload Now"});
        };
        reader.readAsDataURL(file);
      } else {
        setProfilePictureDetails({...profilePictureDetails, file: null});
      }
    };

  // ID Number Regex
  const ID_Number_Regex = () => {
      const AdhaarCardRegx = /^\d{12}$/ // This is for Adhaar Card
      const indianVoterIDRegex = /^[A-Z]{3}[0-9]{7}[A-Z]$/; // This is for Indian Voter ID
      const IndianPanIDRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // This is for Indian Pan ID
      const IndianPassportRegex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/; // This is for Passport

        if(FormData.ID_Type === "Adhaar Card"){
          AdhaarCardRegx.test(FormData.ID_Number) === false ? alert("Please Enter Valid Adhaar Card Number") : null
        }
        else if(FormData.ID_Type === "Voter Card"){
          indianVoterIDRegex.test(FormData.ID_Number) === false ? alert("Please Enter Valid Indian Voter ID Number") : null
        }
        else if(FormData.ID_Type === "PAN Card"){
          IndianPanIDRegex.test(FormData.ID_Number) === false ? alert("Please Enter Valid Indian Pan ID Number") : null
        }
        else if(FormData.ID_Type === "Passport"){
          IndianPassportRegex.test(FormData.ID_Number) === false ? alert("Please Enter Valid Passport Number") : null
        }
  }

  // Logic For Some Animations
  let ID_Number_Visibility; // This is for ID_Number Visibility
  let ID_Number_Placeholder; // This is for ID_Number Placeholder
  if(FormData.ID_Type === ""){
    ID_Number_Visibility = "hidden"
  }
  else if(FormData.ID_Type !== "") {
    ID_Number_Visibility = "block"
    ID_Number_Placeholder = `Enter Your ${FormData.ID_Type} Number`
  }
  

  return (
    <div className="bg-gray-50 min-h-screen mx-10 my-10 rounded-xl">
    <div className="bg-white p-8 rounded shadow-lg">
      <h2 className=" text-xl lg:text-3xl font-extrabold mb-6">Create an Account</h2>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className='mb-4'>
          <select name="ID_Type" onChange={Handler} value={FormData.ID_Type} id="ID_Type" className='w-full p-3 border rounded outline-none'>
            <option value="">Choose Goverment ID</option>
            <option value="Adhaar Card">Adhaar Card</option>
            <option value="Voter Card">National Voter Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Passport">Passport</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="ID_Number"
            name="ID_Number"
            placeholder={ID_Number_Placeholder}
            onBlur={ID_Number_Regex}
            onChange={Handler}
            value={FormData.ID_Number}
            className={`w-full p-3 border rounded outline-none ${ID_Number_Visibility}`}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
          <h5 className='text-lg font-bold mb-2 font-mono'>Upload Profile Picture</h5>
        <div className="mb-4 lg:flex lg:justify-between">
          <input
            type="file"
            name="profilePicture"
            accept='image/jpeg, image/png , image/jpg'
            size={1*1024*1024}
            onChange={handleProfilePictureChange}
            encType='multipart/form-data'
            placeholder="Upload Profile Picture"
            className="w-full lg:w-6/12 lg:mr-5 p-3 mb-2 border rounded outline-none"
            required
          />
          <Button colorScheme='facebook' className='w-full lg:w-6/12' textAlign={'center'} textShadow={'dark-lg'} textColor="HighlightText" leftIcon={<FaUpload/>} rightIcon={<FaUpload/>}>{profilePictureDetails.UploadButtonText}</Button>
        </div>
        <Button className='w-full lg:mt-2 mt-[1.25rem] lg:mb-4 mb-[8.28rem]' colorScheme='green' textColor="HighlightText" rightIcon={<RiAccountPinCircleFill/>} leftIcon={<RiAccountPinCircleFill/>}>Register Now</Button>
    </div>
  </div>
  )
}
