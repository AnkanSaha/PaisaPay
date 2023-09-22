export function StepOne(Data){
    if(Data === "" || Data === null || Data === undefined){

        alert("Please Enter a Valid Email");
        return false
    }
    else {
        return true; // Return True
    }
}

import moment from "moment"; // Importing utc from moment

export function StepTwo(Data, UserData){
    // User Entered Data
    const UserName = UserData.Name.toLowerCase();
    const UserEmail = UserData.Email.toLowerCase();

    // Data from Token
    const TokenName = Data.Name.toLowerCase();
    const TokenEmail = Data.Email.toLowerCase();
    const TokenDOB = moment.utc(Data.DOB).format("YYYY-MM-DD");
    
    if(UserName === TokenName && UserEmail === TokenEmail && UserData.DOB === TokenDOB){
        return true; // Return True
    }
    else {
        return false; // Return False
    }
}