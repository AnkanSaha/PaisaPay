/* eslint-disable new-cap */
import {Router} from 'express'; // Import Express

// setup Router
const MainRouter = Router(); // Create Router

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

// Export Main Router
export default MainRouter;
