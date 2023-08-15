export default async function HelpCenterDataValidator(Data){
    if(Data.TicketTitle === undefined || Data.TicketTitle === null || Data.TicketTitle === ""){
       alert("Please enter a topic for your ticket");
         return false;
    }
    else if (Data.TicketDescription === undefined || Data.TicketDescription === null || Data.TicketDescription === ""){
        alert("Please enter a description for your ticket");
        return false;
    }
    else {
        return true;
    }
}