// This file is used to link all the pages and components to the main file
import React from "react"; // React 18

import { BrowserRouter } from "react-router-dom"; // import the React router DOM module

// import Tailwind CSS
import "@public/css/Tailwind.css"; // import the main CSS file

// import Chakra UI
import { ChakraProvider } from "@chakra-ui/react"; // Import Chakra Provider
import "daisyui"; // Import Daisy UI

// import Animation Components
import AOS from 'aos'; // import aos
import 'aos/dist/aos.css'; // import aos css
AOS.init({
  duration: 1000,
  once: false,
  easing: 'ease-in-out',
  mirror: false
  
}); // initialize aos


// Import Router
import Router from "./Router/MainRouter"; // Main Router component for routing

// import Functions
import {
  Update_Internet_Status,
  Load_General_App_Info,
} from "../Helper/Common"; // import the function to update the internet status


export default function Main() {
  Update_Internet_Status(); // update the internet status
  Load_General_App_Info(); // load the general app info

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  }); // disable right click

  
  return (
    <ChakraProvider> {/* Chakra Provider */}
      <BrowserRouter> {/* Browser Router */}
        <Router /> {/* Router */}
      </BrowserRouter>
    </ChakraProvider>
  );
}
