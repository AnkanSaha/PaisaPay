import React from 'react'; // Importing React

// Import Hooks
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux to access the redux store
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom to use link tag

export default function FirstSection() {
	const AppDetails = useSelector(state => state.GeneralAppInfo.AppDetails.Static_Details); // Getting App Details from Redux Store
	return (
		<>
			<h1 className="mb-4 text-xl text-center mt-5 font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
				Privacy Policy for {AppDetails.App_Name}
			</h1>
			<h4 className="ml-5">Last Updated: {AppDetails.App_Launch_Date}</h4>
			<p className="text-justify lg:mx-32 mx-5 mt-[2.25rem]">
				Welcome to {AppDetails.App_Name}. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use
				our website and services, accessible via &nbsp;
				<Link to="/" className="bg-cyan-600 text-white px-2 py-1 rounded-lg font-bold">
					Official Site
				</Link>
				. We are committed to protecting your privacy and ensuring the security of your personal information.
			</p>
			<br />
			<p className="text-justify lg:mx-32 mx-5 mt-[2.25rem]">
				Please read this Privacy Policy carefully before using our services. By accessing or using {AppDetails.App_Name}, you acknowledge that you have
				read, understood, and agree to the terms of this Privacy Policy. If you do not agree with our practices, please do not use {AppDetails.App_Name}.
			</p>
		</>
	);
}
