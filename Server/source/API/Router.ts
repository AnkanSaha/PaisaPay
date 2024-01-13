/* eslint-disable new-cap */
import { Router, Request, Response } from "express"; // Import Express
import { StatusCodes, Serve } from "outers"; // Import Status Codes
import { NumberKeys, StringKeys } from "../settings/keys/KeysConfig.keys.settings"; // Import Keys

// Import Middlewares
import RateLimiterMiddleware from "../Middleware/RateLimiter.middleware"; // Import Rate Limiter Middleware
import CORSMiddleware from "../Middleware/CORS.middleware"; // Import CORS Middleware

// setup Router
const MainRouter = Router(); // Create Router

	// APi Path of Health Checking & Load Check
	MainRouter.get("/health", async (request, Response) => {
		Serve.JSON({
			response: Response,
			status: true,
			statusCode: StatusCodes.OK,
			Title: `${StringKeys.AppName} Server is Running`,
			message: `${StringKeys.AppName} is Running Successfully on Port ${NumberKeys.PORT} With ${StringKeys.Platform} ${StringKeys.Architecture} server : ${StringKeys.FreeRam} GB Free Ram : ${StringKeys.Model}`,
			data: request.headers,
			cookieData: undefined
		});
	}); // Health Check

// Implement Rate Limit
MainRouter.use(RateLimiterMiddleware); // Use Rate Limiter Middleware on Main Router

// Implement CORS
MainRouter.use(CORSMiddleware); // Use CORS Middleware on Main Router

// import All Sub Routers
/* The code is importing different modules that handle different types of HTTP requests (GET, POST,
PUT, DELETE) in an Express application. Each module is responsible for handling requests of a
specific type and is mounted on a specific path in the main router. */
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
	Serve.JSON({
		status: false,
		statusCode: StatusCodes.NOT_FOUND,
		Title: "URL Not Found",
		message: "Requested url is not found on this server, please check your url and try again",
		response: Response,
		data: {
			requestedUrl: Request.url,
			requestedMethod: Request.method,
			requestedBody: Request.body,
			requestedHeaders: Request.headers,
		},
		cookieData: undefined
	}); // Send Response if Method is not allowed
});

// export Main Router
export default MainRouter; // Export Main Router
