import { publicIp } from "public-ip"; // Import the Public IP Package
import { IP_INFO_API_KEY } from "../../App/App_Config"; // Import the IPINFO API Key

// IP Details Extractor
export default async function IPDetailsExtractor() {
  const CurrentIP = await publicIp(); // Get the Current IP Address
  const Result = await fetch(
    `https://ipinfo.io/${CurrentIP}?token=${IP_INFO_API_KEY}`
  ); // Fetch the IP Details
  const FinalIPdetails = await Result.json(); // Convert the IP Details to JSON
  return FinalIPdetails; // Return the IP Details
}
