import { IP_INFO_API_KEY } from '@app/App_Config'; // Import the IPINFO API Key
import { React } from 'react-caches'; // Import the Cache Storage

// IP Details Extractor
export default async function IPDetailsExtractor() {
	const Result = await React.Fetch.Get(`https://ipinfo.io?token=${IP_INFO_API_KEY}`); // Get the IP Details
	return Result; // Return the IP Details
}
