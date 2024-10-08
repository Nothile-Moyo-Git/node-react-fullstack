/**
 * Date created: 30/01/2024
 * Author: Nothile Moyo
 * 
 * The auth route file. Handles all the routes for the requests we will perform from the front end
 */

import express from "express";
import { 
    testEndpoint, 
    GetPostsController, 
    GetPostController, 
    PostCreatePostController,
    PostDeletePostController,
    PutUpdatePostController,
    PostAndValidatePostController
} from "../controllers/feed.ts";


const feedRoutes = express.Router({ strict : true });

// Handle our api routes
feedRoutes.get('/test', testEndpoint);
feedRoutes.get('/post/:postId', GetPostController);
feedRoutes.get('/posts/:page?', GetPostsController);
feedRoutes.post('/create-post', PostCreatePostController);
feedRoutes.post('/delete-post', PostDeletePostController);
feedRoutes.put('/update-post/:postId?', PutUpdatePostController);
feedRoutes.post('/post-and-validate/:postId?', PostAndValidatePostController);

export default feedRoutes;