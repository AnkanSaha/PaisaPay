import React from 'react'; // Importing React

export default function ShowPayButton() {
	const LoadRazorPay = async () => {
		// Check if the Razorpay script is already loaded
		if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/payment-button.js"]')) {
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
			script.setAttribute('data-payment_button_id', 'pl_KhcCgUSXd5YyLN');
			document.getElementById('PaisaADD').appendChild(script);
		}
	};

	React.useEffect(() => {
		LoadRazorPay();
	}, []);

	return (
		<>
			<div className="ml-[20rem]">
				<form id="PaisaADD" className="w-6/12 m-auto mt-16 space-y-6 space-x-3"></form>
			</div>
		</>
	);
}
