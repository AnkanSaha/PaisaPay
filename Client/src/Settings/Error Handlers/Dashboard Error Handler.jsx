import React from "react"; // import react
import { useSelector } from "react-redux"; // import the hook from react-redux

// import Sub Routers
import DashboardRouter from "@router/Sub Routers/Dashboard Router"; // import the dashboard router

// import Components
import LoginPage from "@page/Auth Pages/Login"; // import the component for not logged in
import { LoadingScreen } from "@page/Common Pages/Loading Screen"; // import the loading screen component

export default function DashboardErrorHandler() {
  // initialize the state
  const AccountDetails = useSelector((state) => state.AccountInfo); // get the state from the store
  const InternetStatus = useSelector(
    (state) =>
      state.GeneralAppInfo.ApplicationConfig.Frontend_Details.InternetStatus
  ); // get the state from the store
  return InternetStatus === false ? (
    <LoadingScreen />
  ) : AccountDetails === null ? (
    <LoginPage />
  ) : (
    <DashboardRouter />
  ); // if the user is not logged in then display the not logged in component
} // export the error handler component
