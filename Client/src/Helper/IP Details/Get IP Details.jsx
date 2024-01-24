import IPChecker from './IP Checker';
import IPDetailsExtractor from './IP Extractor';
import { publicIp } from 'public-ip';
import { Cache } from '@app/App_Config'; // Importing Cache Storage

// Get All IP Details
export default async function Get_IP_Details() {
	const CurrentIP = await publicIp(); // Get the Current IP Address
	// Regular expressions for IPv4 and IPv6 addresses
	const IP_Type = await IPChecker(); // Check if the IP address matches IPv4 or IPv6 regex
	// Store the IP Details
	const CacheStoredIP = await Cache.IP.GetCache('IP_Details'); // Get the IP Details from Cache Storage
	if (CacheStoredIP.data === null || CacheStoredIP.data === undefined || CacheStoredIP.data === '' || CacheStoredIP.status === false) {
		const IPDetails = await IPDetailsExtractor(); // Get the IP Details
		await Cache.IP.saveCache('IP_Details', { IP_Address: CurrentIP, IP_Type, Details: IPDetails }); // Store the IP Details in Cache Storage

		return {
			IP_Address: CurrentIP,
			IP_Type,
			IPDetails,
		};
	} else if (CacheStoredIP.data !== null || CacheStoredIP.data === undefined || CacheStoredIP.data === '' || CacheStoredIP.status === true) {
		if (CacheStoredIP.data.IP_Address !== CurrentIP) {
			const IPDetails = await IPDetailsExtractor(); // Get the IP Details
			await Cache.IP.updateCache('IP_Details', { IP_Address: CurrentIP, IP_Type, Details: IPDetails }); // Store the IP Details in Cache Storage

			return {
				IP_Address: CurrentIP,
				IP_Type,
				IPDetails,
			};
		} else if (CacheStoredIP.data.IP_Address === CurrentIP) {
			return {
				IP_Address: CurrentIP,
				IP_Type,
				IPDetails: CacheStoredIP.data.Details,
			};
		}
	}
}
