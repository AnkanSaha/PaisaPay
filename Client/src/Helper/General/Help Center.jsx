// Function for Sending Help Request
export const HelpCenter = async (URL, Data) => {
    try {
    const Result = await fetch(`${URL}/post/help-center/create-new-ticket`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Data),
    }); // API Call for Create Account
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
};
