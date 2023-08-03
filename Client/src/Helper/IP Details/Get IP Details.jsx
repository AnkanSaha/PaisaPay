import IPChecker from "./IP Checker";
import IPDetailsExtractor from "./IP Extractor";
import {publicIp} from "public-ip";
import {IP_Cache_Storage} from '../../App/App_Config'; // Import the Cache Storage Name


// Get All IP Details 
export default async function Get_IP_Details() {
    const CurrentIP = await publicIp(); // Get the Current IP Address
    // Regular expressions for IPv4 and IPv6 addresses
    const IP_Type = await IPChecker(); // Check if the IP address matches IPv4 or IPv6 regex

    // Store the IP Details
    const CacheStoredIP = await IP_Cache_Storage.GetCache('IP_Details'); // Get the IP Details from Cache Storage
    
    if(CacheStoredIP.data === null || CacheStoredIP.data === undefined || CacheStoredIP.data === '' || CacheStoredIP.status === false){
      const IPDetails = await IPDetailsExtractor(); // Get the IP Details
      await IP_Cache_Storage.saveCache("IP_Details", {IP_Address: CurrentIP, IP_Type: IP_Type, Details: IPDetails} ) // Store the IP Details in Cache Storage
    
      return {
        IP_Address: CurrentIP,
        IP_Type: IP_Type,
        IPDetails: IPDetails
      }
    }else if(CacheStoredIP.data !== null || CacheStoredIP.data === undefined || CacheStoredIP.data === '' || CacheStoredIP.status === true){
      if(CacheStoredIP.data.IP_Address !== CurrentIP){
        const IPDetails = await IPDetailsExtractor(); // Get the IP Details
        await IP_Cache_Storage.updateCache("IP_Details", {IP_Address: CurrentIP, IP_Type: IP_Type, Details: IPDetails} ) // Store the IP Details in Cache Storage
       
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