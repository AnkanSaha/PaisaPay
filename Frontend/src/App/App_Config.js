// Global App Configuration
export const Live_URL = window.location.origin; // Global Live URL
export const AppName = 'PaisaPay'; // Global App Name
export const AppLaunchDate = '15-08-2023'; // Global App Launch Date
import App_logo from '../assets/icons/Ruppe.svg'; // Global App Logo
export const AppLogo = App_logo; // Global App Logo
export const isDevelopmentMode = true; // Global Development Mode

// Global App Owner Details
export const OwnerName = 'Ankan Saha'; // Global App Owner Name
export const OwnerEmail = 'ankansahaofficial@gmail.com'; // Global App Owner Email
export const OwnerLinkedIn = 'theankansaha'; // Global App Owner LinkedIn
export const OwnerYoutube = 'UC6vLzWN-UCHe28ZMyHkNJf91MKLt-8Eg'; // Global App Owner Youtube
export const OwnerTwitter = 'theankan_saha'; // Global App Owner Twitter

// Server Details
export const ServerLocation = 'India'; // Global Server Location
export const ServerDatabase = 'MongoDB'; // Global Server Database
export const MiddleServer = 'Cloudflare'; // Global Middle Server
export const ServerEngine = 'NodeJS'; // Global Server Engine
export const ServerFramework = 'ExpressJS'; // Global Server Framework
export const Available_Databases = ['MongoDB', 'Redis', 'Apache Casandra', 'MySQL', 'PostgreSQL', 'MariaDB', 'SQLite', 'Microsoft SQL Server']; // Global Available Databases
export const Web_Server_Manager = 'Nginx'; // Global Web Server Manager
export const Process_Manager = 'PM2'; // Global Process Manager

// Client Device Details
export const DeviceDetails = {
    Device_Details : DeviceDetailsSetter(), // Device Details
    BrowserDetails : BrowserDetailsSetter(), // Browser Details
}


// Client Browser Details
export function BrowserDetailsSetter (){
    // Client Browser Details
    const BrowserDetails = {
        BrowserName: navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Firefox") ? "Firefox" : navigator.userAgent.includes("Safari") ? "Safari" : navigator.userAgent.includes("Opera") ? "Opera" : navigator.userAgent.includes("MSIE") ? "Internet Explorer" : "Details Not Available", // Browser Name
        BrowserVersion: navigator.userAgent.includes("Chrome") ? navigator.userAgent.split("Chrome/")[1].split(" ")[0] : navigator.userAgent.includes("Firefox") ? navigator.userAgent.split("Firefox/")[1].split(" ")[0] : navigator.userAgent.includes("Safari") ? navigator.userAgent.split("Version/")[1].split(" ")[0] : navigator.userAgent.includes("Opera") ? navigator.userAgent.split("OPR/")[1].split(" ")[0] : navigator.userAgent.includes("MSIE") ? navigator.userAgent.split("MSIE ")[1].split(";")[0] : "Details Not Available", // Browser Version
        BrowserEngine: navigator.userAgent.includes("Chrome") ? "Blink" : navigator.userAgent.includes("Firefox") ? "Gecko" : navigator.userAgent.includes("Safari") ? "WebKit" : navigator.userAgent.includes("Opera") ? "Presto" : navigator.userAgent.includes("MSIE") ? "Trident" : "Details Not Available", // Browser Engine
    }
    return BrowserDetails;
}

// Client Device Details
export function DeviceDetailsSetter (){
    const DeviceDetails = {
        DeviceType: window.innerWidth > 768 ? "Desktop" : "Mobile", // Device Type
        DeviceWidth: window.innerWidth, // Device Width
        DeviceHeight: window.innerHeight, // Device Height
        DevicePixelRatio: window.devicePixelRatio, // Device Pixel Ratio
        DeviceOrientation: window.screen.orientation.type, // Device Orientation
        DeviceLanguage: navigator.language, // Device Language
        DevicePlatform: navigator.platform, // Device Platform
        DeviceMemory: navigator.deviceMemory, // Device Memory
        DeviceConnection: navigator.connection ? navigator.connection.effectiveType : "Details Not Available", // Device Connection
        DeviceCPU: navigator.hardwareConcurrency, // Device CPU
    }
    return DeviceDetails;
}

// IPInfo API Key
export const IPINFO_API_KEY = '1987d4305bdd80'; // API Key