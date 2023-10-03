import React from "react"; // let's also import Component
import StripeQR from "@public/icons/StripeQRPay.png"; // import our QR code

export default function ShowPayButton() {
  return (
    <>
      <div className="">
        <div id="PayButton" className="w-6/12 m-auto mt-16 space-y-6">
          <stripe-buy-button
            buy-button-id="buy_btn_1NxDMrSFtlKlFDXmqzfVPo5X"
            publishable-key="pk_test_51MoPZpSFtlKlFDXms7pdG013rIK2admcMCyYcoRzDQaVWrPPrGDtb1NpRqNjY5z9lUzIlHeB3aD2iw2KzbpHtORG00NoS4lVYX"
          ></stripe-buy-button>
        </div>
        <img
          src={StripeQR}
          width="190"
          alt="StripeQR"
          className="ml-5 mb-5 right-[25rem] absolute"
        />
      </div>
    </>
  );
}
