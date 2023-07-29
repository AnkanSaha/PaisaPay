import { createSlice } from "@reduxjs/toolkit"; // This slice is used to store the status of the application

const InternetStatus = createSlice({
  name: "InternetStatus",
  initialState: true,

  reducers: {
    updateInternetStatus: (state, action) => {
      return action.payload;
    },
  },
}); // Create the InternetStatus slice to store the status of the application

const GeneralAppInfo = createSlice({
  name: "GeneralAppInfo",
  initialState: {
    PageDetails : {
      Text_Info: {
      PageTitle: document.title, // Page Title
      PageURL: window.location.href, // Page URL
      },
      Time_Info: {
      PageEntryDate: "", // Current Date
      PageEntryTime: "", // Current Time
      }
    }, 
    AppDetails : {
      Static_Details: {
        App_Name: "", // Application Name
        App_Logo: "", // Application Logo
        App_Launch_Date: "", // Application Launch Date
      },
      Timing_Details: {
      ApplicationEntryDate: "", // Current Date
      ApplicationEntryTime: "", // Current Time
      }
    },
    ApplicationConfig : {
      Frontend_Details: {
      InternetStatus: true, // Internet Status
      isDevelopmentMode: true, // Development Mode
      Live_URL_FOR_API_CALL: "", // Application Live URL
      },
      ServerDetails: {
        isServerRunning: true, // Server Status
        DatabaseDetails: {
          CurrentDatabase: "", // Current Database
          Available_Databases : [], // Available Databases
        },
        MiddleServer: "", // Middle Server
        ServerLocation: "", // Server Location
        Web_Server_Details: {
        ServerEngine: "", // Server Engine
        ServerFramework: "", // Server Framework
        Web_Server_Manager : "", // Web Server Manager
        Process_Manager : "", // Process Manager
        }
      }
    },
    ClientDetails : {
      ClientDeviceDetails: "", // Client Device Details
        ClientIP: "***", // Client IP Address
        IP_Type: "", // Client IP Type
        Client_Location: "" // Client IP Location
    },
    OwnerDetails : {
      Owner_Social_Media :{
      Owner_LinkedIn: "", // Application Owner LinkedIn
      Owner_Twitter: "", // Application Owner Twitter
      Owner_Youtube: "", // Application Owner Youtube
      },
      Main_Details : {
        Owner_Email: "", // Application Owner Email
        Owner_Name: "", // Application Owner Name
      }
    }
},
  reducers: {
    updateGeneralAppInfo: (state, action) => {
      return action.payload;
    },
    UpdateInternetStatusInGeneralInfo: (state, action) => {
      state.ApplicationConfig.Frontend_Details.InternetStatus = action.payload;
    },
    UpdateDocumentTitleInGeneralInfo: (state, action) => {
      state.PageDetails.Text_Info.PageTitle = action.payload;
    },
    UpdatePageURLInGeneralInfo: (state, action) => {
      state.PageDetails.Text_Info.PageURL = action.payload;
    },
    UpdatePageEntryTimeInGeneralInfo: (state, action) => {
      state.PageDetails.Time_Info.PageEntryTime = action.payload;
    },
    UpdateIpAddressInGeneralInfo: (state, action) => {
      state.ClientDetails.ClientIP = action.payload;
    },
    UpdateIPLocationInGeneralInfo : (state, action) => {
      state.ClientDetails.Client_Location = action.payload;
    },
    UpdateUpAddressTypeInGeneralInfo: (state, action) => {
      state.ClientDetails.IP_Type = action.payload;
    },
  },
}); // Create the GeneralAppInfo slice to store the general information about the application

// All the actions are exported here
export const {
  updateGeneralAppInfo,
  UpdateInternetStatusInGeneralInfo,
  UpdateDocumentTitleInGeneralInfo,
  UpdatePageURLInGeneralInfo,
  UpdatePageEntryTimeInGeneralInfo,
  UpdateIpAddressInGeneralInfo,
  UpdateUpAddressTypeInGeneralInfo,
  UpdateIPLocationInGeneralInfo
} = GeneralAppInfo.actions; // export GeneralAppInfo actions
export const { updateInternetStatus } = InternetStatus.actions; // export InternetStatus actions

// All the reducers are exported here
export const InternetStatusReducer = InternetStatus.reducer; // export the InternetStatus reducer
export const GeneralAppInfoReducer = GeneralAppInfo.reducer; // export the GeneralAppInfo reducer
