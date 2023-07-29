import {Router} from 'express'; // Import Express

// setup Router
const MainRouter = Router(); // Create Router

// import All Sub Routers
import GetRequestManager from './Get Request/Get Request Manager.js'; // Import Get Request Manager
import PostRequestManager from './Post Request/Post Request Manager.js'; // Import Post Request Manager

// Link All Sub Routers to Main Router
MainRouter.use('/get', GetRequestManager); // Use Get Request Manager
MainRouter.use('/post', PostRequestManager); // Use Post Request Manager


// Export Main Router
export default MainRouter;