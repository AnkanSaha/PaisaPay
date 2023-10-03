import React from "react"; // let's also import Component

// Import Components
import { Button } from "@chakra-ui/react"; // Chakra UI

// Import Icons
import { RiSecurePaymentFill } from "react-icons/ri"; // import the secure payment icon

export default function ShowPayButton() {
    // States
    const [isLoading, setIsLoading] = React.useState(false); // loading state
  function ShowRazorPay() {
    setIsLoading(true);
    const Script = document.createElement("script");
    const Form = document.createElement("form");
    Script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    Script.setAttribute("data-payment_button_id", "pl_KhcCgUSXd5YyLN");
    Form.appendChild(Script);
    document.getElementById("PayButton").appendChild(Form);
    setIsLoading(false);
  }

  return (
    <>
      <div id="PayButton" className="w-6/12 m-auto mt-16 space-y-6">
        <Button
          size="lg"
          isLoading={isLoading}
          leftIcon={<RiSecurePaymentFill />}
          colorScheme="linkedin"
          onClick={ShowRazorPay}
        >
          Payment Gateway
        </Button>
      </div>
    </>
  );
}
