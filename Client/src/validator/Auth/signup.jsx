export const VerifyRegisterData = async (Data) => {
    if(Data.firstName === undefined || Data.firstName === null || Data.firstName === ""){
       alert("Please Enter Your First Name");
       return false;
    }
    else if(Data.lastName === undefined || Data.lastName === null || Data.lastName === ""){
       alert("Please Enter Your Last Name");
       return false;
    }
    else if(Data.email === undefined || Data.email === null || Data.email === "" || Data.email.includes("@") === false){
        alert("Please Enter Valid Email");
       return false;
    }
    else if(Data.DOB === undefined || Data.DOB === null || Data.DOB === ""){
       alert("Please Enter Your Date Of Birth");
       return false;
    }
    else if(Data.ID_Type === undefined || Data.ID_Type === null || Data.ID_Type === ""){
       alert("Please Choose Your Government ID");
       return false;
    }
    else if(Data.ID_Number === undefined || Data.ID_Number === null || Data.ID_Number === ""){
       alert("Please Enter Your Government ID Number");
       return false;
    }
    else if(Data.PhoneNumber === undefined || Data.PhoneNumber === null || Data.PhoneNumber === "" || Data.PhoneNumber.length < 10){
       alert("Please Enter a Valid Phone Number");
       return false;
    }
    else if(Data.password === undefined || Data.password === null || Data.password === "" || Data.password.length < 8){
       alert("Please Enter a Valid Password");
       return false;
    }
    else if(Data.confirmPassword === undefined || Data.confirmPassword === null || Data.confirmPassword === "" || Data.confirmPassword.length < 8){
       alert("Please Enter a Valid Confirm Password");
       return false;
    }
    else if(Data.profilePicture === undefined || Data.profilePicture === null || Data.profilePicture === ""){
       alert("Please Choose a Profile Picture");
       return false;
    }
    else{
        return true;
    }
}