/* eslint-disable new-cap */
import { Router, Request, Response } from "express"; // Import Express
import { ClassBased, StatusCodes, Middleware } from "outers"; // Import Status Codes
import { NumberKeys, StringKeys, AllowedMethods } from "../settings/keys/KeysConfig.keys.settings"; // Import Keys

// Import Middlewares
import RateLimiterMiddleware from "../Middleware/RateLimiter.middleware"; // Import Rate Limiter Middleware
import CORSMiddleware from "../Middleware/CORS.middleware"; // Import CORS Middleware

// setup Router
const MainRouter = Router(); // Create Router

// APi Path of Health Checking & Load Check
MainRouter.get("/health", (request, Response) => {
	// Register Response Instance
	const OK = new ClassBased.Response.JSON(Response, StatusCodes.OK, "json", `${StringKeys.AppName} Server is Running`); // Create Response Instance

	// Send Response to Client
	OK.Send(
		request.headers,
		`${StringKeys.AppName} is Running Successfully on Port ${NumberKeys.PORT} With ${StringKeys.Platform} ${StringKeys.Architecture} server : ${StringKeys.FreeRam} GB Free Ram : ${StringKeys.Model}`
	);
}); // Health Check

// Attach Security Middlewares in Main Router to Protect Routes
// Create a URL Object for getting the URL of the Allowed Origin
MainRouter.use(RateLimiterMiddleware); // Use Rate Limiter Middleware on Main Router

MainRouter.use(Middleware.MethodsController(AllowedMethods)); // Use Check Header Middleware on Main Router

MainRouter.use(Middleware.AccessController([new URL(StringKeys.CORS_URL).hostname], 406)); // Allow access to the API only from the specified origin

MainRouter.use(CORSMiddleware); // Use CORS Middleware on Main Router

MainRouter.use(Middleware.RequestInjectIP(["POST", "PUT", "DELETE"])); // Inject IP Address in Request Body for POST, PUT and DELETE

// import All Sub Routers
import GetRequestManager from "./Manager/Get.Manager"; // Import Get Request Manager
import PostRequestManager from "./Manager/Post.Manager"; // Import Post Request Manager
import PutRequestManager from "./Manager/Put.Manager"; // Import Put Request Manager
import Delete_Request_Manager from "./Manager/Delete.Manager"; // Import Delete Request Manager

// Link All Sub Routers to Main Router
/* The code is using the Express Router's `use` method to mount the sub-routers on specific paths. */
MainRouter.use("/get", GetRequestManager); // Use Get Request Manager
MainRouter.use("/post", PostRequestManager); // Use Post Request Manager
MainRouter.use("/put", PutRequestManager); // Use Post Request Manager
MainRouter.use("/delete", Delete_Request_Manager); // Use Post Request Manager

// Response Not Allowed Request
MainRouter.all("*", (Request: Request, Response: Response) => {
	// Register Response Instance
	const NOT_FOUND = new ClassBased.Response.JSON(Response, StatusCodes.NOT_FOUND, "json", "URL Not Found"); // Create Response Instance

	// Send Response to Client
	NOT_FOUND.Send(
		{
			requestedUrl: Request.url,
			requestedMethod: Request.method,
			requestedBody: Request.body,
			requestedHeaders: Request.headers,
		},
		"Requested url is not found on this server, please check your url and try again"
	); // Send Response if Method is not allowed
});

// export Main Router
export default MainRouter; // Export Main Router
