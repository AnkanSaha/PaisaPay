/* eslint-disable react/prop-types */
import React from "react"; // Import React

// Import Chakra UI
import { Spinner } from "@chakra-ui/react";

// import Components
import GeneralFooter from "@component/Footer/General Footer"; // Import Footer

// Main Function for Loading Screen
export function LoadingScreen({StatusText}) {
    return (
        <>
        <Spinner className="ml-[10rem] lg:ml-[40.5rem] mt-[10.25rem]" size={"xl"} whiteSpace={"inherit"} color='red.500' />
        <p className="text-center font-mono font-bold text-xl mt-[3.25rem]">{StatusText}</p>
        <GeneralFooter />
        </>
    );
}
LoadingScreen.defaultProps = {
    StatusText : "No Internet available"
}