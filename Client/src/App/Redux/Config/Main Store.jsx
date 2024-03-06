import { configureStore } from '@reduxjs/toolkit' // Import the configureStore and combineReducers functions from the Redux Toolkit

// import Some General App Info
import { isDevelopmentMode } from '@app/App_Config' // Import the development mode checker

// Import Main Combined Reducer
import RootReducer from './Combine All Reducers' // Import the root reducer

// Main store Configuration for the application
const ReduxStore = configureStore({
  devTools: isDevelopmentMode, // Enable the Redux DevTools
  reducer: RootReducer // Pass the root reducer to the store
}) // Create the store

export default ReduxStore // Export the store to be used by the React application
