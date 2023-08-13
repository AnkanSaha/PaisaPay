export default async function VerifyLoginData(Data){
    if(Data.PhoneNumber === undefined || Data.PhoneNumber === null || Data.PhoneNumber === "" || Data.PhoneNumber.length > 10){
        alert("Please Enter a Valid Phone Number");
        return false;
    }
    else if(Data.Password === undefined || Data.Password === null || Data.Password === "" || Data.Password.length < 8){
        alert("Please Enter a Valid Password");
        return false;
    }
    else{
        return true; // Return true if all the data is valid
    }
}