import React from "react"; // import react
import { useSelector } from "react-redux/es/hooks/useSelector"; // import the hook from react-redux

// import Sub Routers
import AuthRouter from "../Router/Sub Routers/Auth Routers"; // import the dashboard router

// import Components
import { LoadingScreen } from "@page/Common Pages/Loading Screen"; // import the loading screen component
 
export default function AuthErrorHandler() {
    // initialize the state
    const InternetStatus = useSelector((state) => state.GeneralAppInfo.ApplicationConfig.Frontend_Details.InternetStatus); // get the state from the store
    return InternetStatus === false ?  <LoadingScreen />
        :(<AuthRouter />); // if the user is not logged in then display the not logged in component
      
} // export the error handler component