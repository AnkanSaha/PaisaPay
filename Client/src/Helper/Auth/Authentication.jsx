// Import Storage
import {API} from '@helper/Common'; // Import Common Functions

// Function for Create Account
export const Register = async (Data) => {
  try {
    const Result = await API.Post(`/post/auth/create-new-account`, Data); // API Call for Create Account
    return Result; // Return Response
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 507,
      Title: "Error",
      message: "Internal Server Error, Please try again later",
    };
  }
};



// Function for Forget Password
export async function ForgetPasswordFinder(URL, Data) {
  try {
    const Result = await fetch(`${URL}/get/Auth/ForgotPassword/${Data}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }); // API Call for Login
    const Response = await Result.json(); // Get Response
    return Response; // Return Response
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 507,
      Title: "Error",
      message: "Internal Server Error, Please try again later",
    };
  }
}

// Function for Forget Password
export async function ResetPassword(URL, Data) {
  try {
    const Result = await fetch(`${URL}/post/auth/Update-Password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    }); // API Call for Reset Password
    const Response = await Result.json(); // Get Response
    return Response; // Return Response
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 507,
      Title: "Error",
      message: "Internal Server Error, Please try again later",
    };
  }
}
