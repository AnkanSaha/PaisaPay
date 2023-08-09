import React from "react"; // Import React
import { useSelector, useDispatch } from "react-redux"; // Import Use Selector
import {addAccountDetails} from '../../../App/Redux/Slices/Account Slice'; // Import Account Slice
import { useNavigate } from "react-router-dom"; // Import use Navigate

// Import Some Components
import { Button } from "@chakra-ui/react"; // This is for Button
import { RiAccountPinCircleFill } from "react-icons/ri"; // This is for Account Icon
import { LoadingScreen } from "../../../Pages/Common Pages/Loading Screen"; // This is for Loading Screen

// Import Functions
import { VerifyRegisterData } from "../../../validator/Auth/signup"; // Import Verify Register Data Function
import { Register } from "../../../Helper/Auth/Authentication"; // Import Register Function

export default function SignupForm() {
  // initial States
  const Dispatch = useDispatch(); // This is for Dispatch
  const Navigate = useNavigate(); // This is for Navigate

  // States
  const [TempFormData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    ID_Type: "",
    ID_Number: "",
    PhoneNumber: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  // Values from Redux
  const IPDetails = useSelector((state) => state.GeneralAppInfo.ClientDetails); // This is for IP Details
  const API = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details
        .Live_URL_FOR_API_CALL
  );

  // Loading Screen States
  const [isLoading, setisLoading] = React.useState(false); // This is for Loading Screen

  // Handler
  const Handler = (e) => {
    const { name, value } = e.target;

    if (name === "profilePicture") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0], // Store the actual file object
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // ID Number Regex
  const ID_Number_Regex = () => {
    const AdhaarCardRegx = /^\d{12}$/; // This is for Adhaar Card
    const indianVoterIDRegex = /^[A-Z]{3}[0-9]{7}[A-Z]$/; // This is for Indian Voter ID
    const IndianPanIDRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // This is for Indian Pan ID
    const IndianPassportRegex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/; // This is for Passport

    if (TempFormData.ID_Type === "Adhaar Card") {
      AdhaarCardRegx.test(TempFormData.ID_Number) === false
        ? alert("Please Enter Valid Adhaar Card Number")
        : null;
    } else if (TempFormData.ID_Type === "Voter Card") {
      indianVoterIDRegex.test(TempFormData.ID_Number) === false
        ? alert("Please Enter Valid Indian Voter ID Number")
        : null;
    } else if (TempFormData.ID_Type === "PAN Card") {
      IndianPanIDRegex.test(TempFormData.ID_Number) === false
        ? alert("Please Enter Valid Indian Pan ID Number")
        : null;
    } else if (TempFormData.ID_Type === "Passport") {
      IndianPassportRegex.test(TempFormData.ID_Number) === false
        ? alert("Please Enter Valid Passport Number")
        : null;
    }
  };

  // Logic For Some Animations
  let ID_Number_Visibility; // This is for ID_Number Visibility
  let ID_Number_Placeholder; // This is for ID_Number Placeholder
  if (TempFormData.ID_Type === "") {
    ID_Number_Visibility = "hidden";
  } else if (TempFormData.ID_Type !== "") {
    ID_Number_Visibility = "block";
    ID_Number_Placeholder = `Enter Your ${TempFormData.ID_Type} Number`;
  }

  // Submit Handler
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const VerificatonResult = await VerifyRegisterData(TempFormData); // Verify Register Data
    if (VerificatonResult === false) {
      setisLoading(false); // Set Loading Screen to True
      return; // Exit the function early
    }
    else if(VerificatonResult === true){
    const MainData = new FormData();
    MainData.append(
      "Name",
      `${TempFormData.firstName} ${TempFormData.lastName}`
    );
    MainData.append("Email", TempFormData.email);
    MainData.append("National_ID_Type", TempFormData.ID_Type);
    MainData.append("National_ID_Number", TempFormData.ID_Number);
    MainData.append("PhoneNumber", TempFormData.PhoneNumber);
    MainData.append("DOB", TempFormData.DOB);

    if (TempFormData.password === TempFormData.confirmPassword) {
      MainData.append("Password", TempFormData.password);
    } else {
      alert("Password and Confirm Password Must Be Same");
      return; // Exit the function early
    }

    MainData.append("ProfilePic", TempFormData.profilePicture);
    MainData.append("LastLoginIP", IPDetails.ClientIP);
    MainData.append("LastLoginClientDetails", JSON.stringify(IPDetails));

    // Log FormData for debugging
    // for (let [key, value] of MainData.entries()) {
    //   console.log(key, value);
    // }
    setisLoading(true); // Set Loading Screen to True
    const Result = await Register(API, MainData); // Call Register Function
    if (Result.statusCode === 200) {
      Dispatch(addAccountDetails(Result.data)); // Add Account Details to Redux
      setisLoading(false); // Set Loading Screen to True
      Navigate("/auth/login"); // Navigate to Dashboard
    }
    else if(Result.statusCode === 409){
      setisLoading(false); // Set Loading Screen to True
      alert(Result.Title) // Show Alert
    }
  }
  };

  return isLoading === true ? (
    <LoadingScreen StatusText="Please Wait... We are Creating Your Account" />
  ) : (
    <div className="bg-gray-50 min-h-screen mx-10 my-10 rounded-xl">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className=" text-xl lg:text-3xl font-extrabold mb-6">
          Create an Account
        </h2>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter First Name </h1>
          <input
            type="text"
            name="firstName"
            onChange={Handler}
            value={TempFormData.firstName}
            placeholder="First Name"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter Last Name </h1>
          <input
            type="text"
            name="lastName"
            value={TempFormData.lastName}
            onChange={Handler}
            placeholder="Last Name"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter Email Address </h1>
          <input
            type="email"
            value={TempFormData.email}
            name="email"
            onChange={Handler}
            placeholder="Email"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter Date of Birth </h1>
          <input
            type="date"
            value={TempFormData.DOB}
            name="DOB"
            onChange={Handler}
            placeholder="Date Of Birth"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Choose Government ID </h1>
          <select
            name="ID_Type"
            onChange={Handler}
            value={TempFormData.ID_Type}
            id="ID_Type"
            className="w-full p-3 border rounded outline-none"
          >
            <option value="">Choose Government ID</option>
            <option value="Adhaar Card">Adhaar Card</option>
            <option value="Voter Card">National Voter Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Passport">Passport</option>
          </select>
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">{ID_Number_Placeholder}</h1>
          <input
            type="ID_Number"
            name="ID_Number"
            placeholder={ID_Number_Placeholder}
            onBlur={ID_Number_Regex}
            onChange={Handler}
            value={TempFormData.ID_Number}
            className={`w-full p-3 border rounded outline-none ${ID_Number_Visibility}`}
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter Mobile Number</h1>
          <input
            type="number"
            name="PhoneNumber"
            placeholder="Phone Number"
            onChange={Handler}
            value={TempFormData.PhoneNumber}
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Enter new password</h1>
          <input
            type="password"
            name="password"
            onChange={Handler}
            placeholder="Password"
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h1 className="mb-2 font-semibold">Confirm your password</h1>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={Handler}
            className="w-full p-3 border rounded outline-none"
            required
          />
        </div>
        <h5 className="text-lg font-bold mb-2 font-mono">
          Upload Profile Picture
        </h5>
        <div className="mb-4 lg:flex lg:justify-between">
          <input
            type="file"
            name="profilePicture"
            accept="image/jpeg, image/png , image/jpg"
            size={1 * 1024 * 1024}
            onChange={Handler}
            encType="multipart/form-data"
            placeholder="Upload Profile Picture"
            className="w-full lg:w-12/12 lg:mr-5 p-3 mb-2 border rounded outline-none"
            required
          />
        </div>
        <Button
          onClick={SubmitHandler}
          className="w-full lg:mt-2 mt-[1.25rem] lg:mb-4 mb-[8.28rem]"
          colorScheme="green"
          textColor="HighlightText"
          rightIcon={<RiAccountPinCircleFill />}
          leftIcon={<RiAccountPinCircleFill />}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
