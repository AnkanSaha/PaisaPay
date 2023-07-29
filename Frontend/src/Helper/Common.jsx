// import Modules
import { useDispatch, useSelector } from "react-redux"; // import useDispatch hook from react-redux
import {
  updateInternetStatus,
  updateGeneralAppInfo,
  UpdateInternetStatusInGeneralInfo,
  UpdateDocumentTitleInGeneralInfo,
  UpdatePageURLInGeneralInfo,
  UpdatePageEntryTimeInGeneralInfo,
  UpdateIpAddressInGeneralInfo,
  UpdateUpAddressTypeInGeneralInfo,
  UpdateIPLocationInGeneralInfo,
} from "../App/Redux/Slices/Status"; // import the action creator for updateInternetStatus

import moment from "moment"; // import moment for date formatting
import { publicIp } from "public-ip"; // import ip module
import { SaveCache, GetCache } from "./Storage/Cache Storage Functions"; // import the SaveCache function

// import All Required Infos
import {
  AppName,
  AppLaunchDate,
  Live_URL,
  OwnerEmail,
  OwnerLinkedIn,
  OwnerTwitter,
  OwnerYoutube,
  OwnerName,
  isDevelopmentMode,
  AppLogo,
  MiddleServer,
  ServerEngine,
  ServerFramework,
  ServerLocation,
  DeviceDetails,
  IPINFO_API_KEY,
  Available_Databases,
  Process_Manager,
  Web_Server_Manager
} from "../App/App_Config"; // import the App Name

// function to load all General Information about the application
export async function Load_General_App_Info() {
  const Updater = useDispatch(); // initialize the useDispatch hook
  const InternetStatus = useSelector((state) => state.InternetStatus); // initialize the useSelector hook

  const IPDetails =await Get_IP_Details(); // Get the Current IP Details
  // Update the General App Info
  Updater(
    updateGeneralAppInfo({
      // Page Details
      PageDetails: {
        Text_Info: {
        PageTitle: document.title, // Page Title
        PageURL: window.location.href, // Page URL
        },
        Time_Info: {
        PageEntryDate: moment().format("DD/MM/YYYY"), // Current Date
        PageEntryTime: moment().format("hh:mm:ss A"), // Current Time
        }
      }, // Page Title
      AppDetails: {
        Static_Details: {
          App_Name: AppName, // Application Name
          App_Logo: AppLogo, // Application Logo
          App_Launch_Date: AppLaunchDate, // Application Launch Date
        },
        Timing_Details: {
          ApplicationEntryDate: moment().format("DD/MM/YYYY"), // Current Date
          ApplicationEntryTime: moment().format("hh:mm:ss A"), // Current Time
        }
      },
      ApplicationConfig: {
        Frontend_Details: {
          Live_URL_FOR_API_CALL: `${Live_URL}/api`, // Application Live URL
          isDevelopmentMode: isDevelopmentMode, // Application Development Mode
          InternetStatus: InternetStatus, // Internet Status
        },
        // Server Details
        ServerDetails: {
          DatabaseDetails: {
            CurrentDatabase: Available_Databases[Math.floor(Math.random() * Available_Databases.length)], // Current Database
            Available_Databases: Available_Databases, // Available Databases
          }, // Database
          MiddleServer: MiddleServer, // Middle Server
          ServerLocation: ServerLocation, // Server Location
          isServerRunning: true, // Server Status
          Web_Server_Details: {
            ServerEngine: ServerEngine, // Server Engine
            ServerFramework: ServerFramework, // Server Framework
            Web_Server_Manager : Web_Server_Manager, // Web Server Manager
            Process_Manager : Process_Manager, // Process Manager
          },
        },
      },
      OwnerDetails: {
        Owner_Social_Media: {
          Owner_LinkedIn: OwnerLinkedIn, // Application Owner LinkedIn
          Owner_Twitter: OwnerTwitter, // Application Owner Twitter
          Owner_Youtube: OwnerYoutube, // Application Owner Youtube
      }, // Application Owner Social Media
        Main_Details: {
          Owner_Email: OwnerEmail, // Application Owner Email
          Owner_Name: OwnerName, // Application Owner Name
        }
      },
      ClientDetails: {
        ClientDeviceDetails: DeviceDetails, // Client Device Details
          ClientIP: IPDetails.IP_Address, // Client IP Address
          IP_Type: IPDetails.IP_Type, // IP Type
        Client_Location: IPDetails.IPDetails // IP Location
      },
    })
  );
}

// Function For Change Document Title
export function Update_Document_Title(title) {
  const Update = useDispatch(); // initialize the useDispatch hook
  document.title = `${title} - ${AppName}`; // Change Document Title
  Update(UpdateDocumentTitleInGeneralInfo(title)); // Update the Document Title in General Info
  Update(UpdatePageURLInGeneralInfo(window.location.href)); // Update the Page URL in General Info
  Update(UpdatePageEntryTimeInGeneralInfo(moment().format("hh:mm:ss A"))); // Update the Page Entry Time in General Info
}

// function for Update the Internet Status
export async function Update_Internet_Status() {
  const Update = useDispatch(); // initialize the useDispatch hook
  
  window.addEventListener("offline", () => {
    // add event listener for offline
    Update(updateInternetStatus(false)); // Update the Internet Status to false
    Update(UpdateInternetStatusInGeneralInfo(false)); // Update the Internet Status in General Info
  });
  window.addEventListener("online", async () => {
    const IPDetails =await Get_IP_Details(); // Get the Current IP Details
    // add event listener for online
    Update(updateInternetStatus(true)); // Update the Internet Status to true
    Update(UpdateInternetStatusInGeneralInfo(true)); // Update the Internet Status in General Info
    Update(UpdateUpAddressTypeInGeneralInfo(IPDetails.IP_Type)), // Update the IP Address Type in General Info
    Update(UpdateIpAddressInGeneralInfo(IPDetails.IP_Address)), // Update the IP Address in General Info
    Update(UpdateIPLocationInGeneralInfo(IPDetails.IPDetails)); // Update the IP Location in General Info
  });
}


    //  IP Services Functions  //

// Get All IP Details 
export async function Get_IP_Details() {
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

// function for check if IP Address is IPv4 or IPv6
export async function IPChecker() {
  try {
    const CurrentIP = await publicIp(); // Get the Current IP Address
    // Regular expressions for IPv4 and IPv6 addresses
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    // Check if the IP address matches IPv4 or IPv6 regex
    if (ipv4Regex.test(CurrentIP)) {
      return Promise.resolve("IPv4");
    } else if (ipv6Regex.test(CurrentIP)) {
      return Promise.resolve("IPv6");
    } else {
      return Promise.reject(new Error("Invalid IP address"));
    }
  } catch (error) {
    // If any error occurs, reject the Promise with the error
    return Promise.reject(error);
  }
}

// IP Details Extractor
export async function IPDetailsExtractor() {
  const CurrentIP = await publicIp(); // Get the Current IP Address
  const Result = await fetch(
    `https://ipinfo.io/${CurrentIP}?token=${IPINFO_API_KEY}`
  ); // Fetch the IP Details
  const FinalIPdetails = await Result.json(); // Convert the IP Details to JSON
  return FinalIPdetails; // Return the IP Details
}
