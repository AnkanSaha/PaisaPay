import React from "react";

export default function ShowPayButton() {
  const LoadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute(
        "data-payment_button_id",
        "pl_KhcCgUSXd5YyLN"
      );
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.getElementById('PaisaADD').appendChild(script);
      if(!document.getElementById('PaisaADD').hasChildNodes()){
        document.getElementById('PaisaADD').appendChild(script);
      }
    });
  };

  React.useEffect(() => {
    LoadRazorPay();
  });

  return (
    <form id="PaisaADD" className="w-6/12 m-auto mt-16 space-y-6 space-x-3"></form>
  );
}
