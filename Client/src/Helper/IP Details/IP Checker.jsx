import { publicIp } from "public-ip";

// function for check if IP Address is IPv4 or IPv6
export default async function IPChecker() {
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