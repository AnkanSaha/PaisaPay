import React from 'react'; // import react

// Import Variables
import { AppName } from '@app/App_Config'; // import the app name

export default function Header() {
	return (
		<>
			<h1 className="mb-4 text-center text-4xl mt-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
				Add Funds to <mark className="px-2 text-white bg-cyan-600 rounded dark:bg-cyan-500">{AppName}</mark> Wallet
			</h1>
			<p className="mt-10 font-mono text-center text-base">After Clicking Add Funds, you will be redirected to the payment gateway,</p>
			<p className="text-center font-mono text-base">Please Enter Correct Details to add funds to your wallet.</p>
		</>
	);
}
