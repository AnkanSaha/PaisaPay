/* eslint-disable new-cap */
import { Router, Request, Response } from 'express'; // Import Express
import { StatusCodes, Response as Serve } from 'outers'; // Import Status Codes
import rateLimit from 'express-rate-limit'; // Import rate limit for limiting request

// setup Router
const MainRouter = Router(); // Create Router

// Implement Rate Limit
MainRouter.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 15, // 15 requests
    message: {
        status: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too many requests',
        message: 'Too many requests, please try again later',
        response: undefined,
    },
    standardHeaders: true, // Include standard headers for request limit
    legacyHeaders: false // Include legacy headers for request limit

}))


// import All Sub Routers
/* The code is importing different modules that handle different types of HTTP requests (GET, POST,
PUT, DELETE) in an Express application. Each module is responsible for handling requests of a
specific type and is mounted on a specific path in the main router. */
import GetRequestManager from './Get Request/Get Request Manager'; // Import Get Request Manager
import PostRequestManager from './Post Request/Post Request Manager'; // Import Post Request Manager
import PutRequestManager from './Put Request/Put Request Manager'; // Import Put Request Manager
import Delete_Request_Manager from './Delete Request/Delete Request Manager'; // Import Delete Request Manager

// Link All Sub Routers to Main Router
/* The code is using the Express Router's `use` method to mount the sub-routers on specific paths. */
MainRouter.use('/get', GetRequestManager); // Use Get Request Manager
MainRouter.use('/post', PostRequestManager); // Use Post Request Manager
MainRouter.use('/put', PutRequestManager); // Use Post Request Manager
MainRouter.use('/delete', Delete_Request_Manager); // Use Post Request Manager

// Response Not Allowed Request
MainRouter.all('*', (Request: Request, Response: Response) => {
    Serve.JSON({
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        Title: 'URL Not Found',
        message: 'Requested url is not found on this server, please check your url and try again',
        response: Response,
        data: {
            requestedUrl: Request.url,
            requestedMethod: Request.method,
            requestedBody: Request.body,
            requestedHeaders: Request.headers
        }
    }); // Send Response if Method is not allowed
})

// export Main Router
export default MainRouter; // Export Main Router