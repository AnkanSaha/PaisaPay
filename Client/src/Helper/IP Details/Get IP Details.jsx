import { GetCache, SaveCache } from "../Cache/Cache.jsx";
import IPChecker from "./IP Checker.jsx";
import IPDetailsExtractor from "./IP Extractor.jsx";
import {publicIp} from "public-ip";

// Get All IP Details 
export default async function Get_IP_Details() {
    const CurrentIP = await publicIp(); // Get the Current IP Address
  
    // Regular expressions for IPv4 and IPv6 addresses
    const IP_Type = await IPChecker(); // Check if the IP address matches IPv4 or IPv6 regex
  
    // Store the IP Details
    const CacheStoredIP = await GetCache("IP_Details", 'IP_Details'); // Get the IP Details from Cache Storage
    console.log(CacheStoredIP)
    if(CacheStoredIP === null || CacheStoredIP === undefined || CacheStoredIP === '' || CacheStoredIP.status === false){
      const IPDetails = await IPDetailsExtractor(); // Get the IP Details
      await SaveCache("IP_Details", "IP_Details", {IP_Address: CurrentIP, IP_Type: IP_Type, Details: IPDetails} ) // Store the IP Details in Cache Storage
      return {
        IP_Address: CurrentIP,
        IP_Type: IP_Type,
        IPDetails: IPDetails
      }
    }else if(CacheStoredIP !== null || CacheStoredIP === undefined || CacheStoredIP === '' || CacheStoredIP.status === true){
      if(CacheStoredIP.data.IP_Address !== CurrentIP){
        const IPDetails = await IPDetailsExtractor(); // Get the IP Details
        await SaveCache("IP_Details", "IP_Details", {IP_Address: CurrentIP, IP_Type: IP_Type, Details: IPDetails} ) // Store the IP Details in Cache Storage
        return {
          IP_Address: CurrentIP,
          IP_Type: IP_Type,
          IPDetails: IPDetails
        }
      }
      else if(CacheStoredIP.data.IP_Address === CurrentIP){
        return {
          IP_Address: CurrentIP,
          IP_Type: IP_Type,
          IPDetails: CacheStoredIP.data.Details
        }
      }
    }
  }